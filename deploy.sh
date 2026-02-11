#!/bin/bash
set -e

DOMAIN="apex.maqsatto.tech"
EMAIL="maqsatto@gmail.com"
PROJECT_DIR="/root/charity-app"

echo "=== Charity App — Full Docker Deploy ==="

# --- 1. Install Docker if not present ---
if ! command -v docker &> /dev/null; then
  echo "[1/7] Installing Docker..."
  curl -fsSL https://get.docker.com | sh
else
  echo "[1/7] Docker already installed."
fi

# --- 2. Install Docker Compose plugin if not present ---
if ! docker compose version &> /dev/null; then
  echo "[2/7] Installing Docker Compose plugin..."
  apt-get update && apt-get install -y docker-compose-plugin
else
  echo "[2/7] Docker Compose already installed."
fi

# --- 3. Create project directory ---
echo "[3/7] Setting up project directory..."
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# --- 4. Stop any existing containers ---
echo "[4/7] Stopping existing containers..."
docker compose down 2>/dev/null || true

# Stop any service using port 80/443
systemctl stop nginx 2>/dev/null || true
systemctl disable nginx 2>/dev/null || true
fuser -k 80/tcp 2>/dev/null || true
fuser -k 443/tcp 2>/dev/null || true

# --- 5. Start with initial config (HTTP only) for SSL cert ---
echo "[5/7] Starting services with HTTP-only config for SSL..."
cp nginx/default-init.conf nginx/default.conf
docker compose up -d --build app mongo nginx

# Wait for everything to come up
echo "Waiting for services to start..."
sleep 10

# --- 6. Obtain SSL certificate ---
echo "[6/7] Obtaining SSL certificate..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN

# --- 7. Switch to full SSL config and restart nginx ---
echo "[7/7] Switching to SSL config and restarting..."
cat > nginx/default.conf << 'NGINX_CONF'
server {
    listen 80;
    server_name apex.maqsatto.tech;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name apex.maqsatto.tech;

    ssl_certificate /etc/letsencrypt/live/apex.maqsatto.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/apex.maqsatto.tech/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 10M;

    location /api/ {
        proxy_pass http://app:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://app:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX_CONF

docker compose restart nginx

echo ""
echo "======================================"
echo "  Deploy complete!"
echo "  https://apex.maqsatto.tech"
echo "======================================"
