# Решение проблемы "Cannot GET /campaign-details.html"

## Проблема
При клике на кнопку "View Campaign" вы видите ошибку: `Cannot GET /campaign-details.html`

## Решение

### Вариант 1: Проверьте структуру файлов

Убедитесь, что файл `campaign-details.html` находится в правильной директории:

```
charity-donation-app/
├── frontend/
│   ├── campaign-details.html  ← Должен быть здесь
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   └── admin.html
├── src/
└── server.js
```

### Вариант 2: Перезапустите сервер

1. Остановите сервер (Ctrl + C в терминале)
2. Запустите снова:
```bash
npm start
# или
npm run dev
```

### Вариант 3: Исправьте путь в campaigns.js

Откройте файл `frontend/js/campaigns.js` и найдите функцию `viewCampaign`:

**Неправильно:**
```javascript
const viewCampaign = (id) => {
  window.location.href = `/campaign-details.html?id=${id}`;  // ❌ Лишний слеш
};
```

**Правильно:**
```javascript
const viewCampaign = (id) => {
  window.location.href = `campaign-details.html?id=${id}`;  // ✅ Без слеша
};
```

### Вариант 4: Проверьте Express настройки

Убедитесь, что в `src/app.js` есть строка:
```javascript
app.use(express.static('frontend'));
```

## Быстрая проверка

1. **Проверьте, что файл существует:**
```bash
ls frontend/campaign-details.html
```

2. **Откройте файл напрямую в браузере:**
```
http://localhost:5000/campaign-details.html?id=CAMPAIGN_ID
```
Замените `CAMPAIGN_ID` на реальный ID кампании из базы данных.

3. **Проверьте консоль браузера:**
   - Откройте Developer Tools (F12)
   - Перейдите в Console
   - Посмотрите, есть ли ошибки JavaScript

## Полный тест работоспособности

### Шаг 1: Запустите сервер
```bash
cd charity-donation-app
npm start
```

### Шаг 2: Откройте главную страницу
```
http://localhost:5000
```

### Шаг 3: Найдите кампанию
Если кампаний нет, создайте одну через админ-панель.

### Шаг 4: Нажмите "View Campaign"
Должна открыться страница с деталями кампании.

## Если ничего не помогает

### Полная переустановка проекта:

1. **Удалите node_modules:**
```bash
rm -rf node_modules
```

2. **Переустановите зависимости:**
```bash
npm install
```

3. **Скопируйте campaign-details.html снова:**
Убедитесь, что файл скопирован в папку `frontend/`

4. **Перезапустите сервер:**
```bash
npm start
```

## Альтернативный способ открытия деталей кампании

Если проблема сохраняется, вы можете открыть детали кампании напрямую:

1. **Получите ID кампании:**
   - Откройте MongoDB Compass
   - Найдите коллекцию `campaigns`
   - Скопируйте `_id` нужной кампании

2. **Откройте URL напрямую:**
```
http://localhost:5000/campaign-details.html?id=64b2c3d4e5f6g7h8i9j0k1l2
```
Замените ID на ваш.

## Проверка через curl

Проверьте, что сервер отдает файл:

```bash
curl -I http://localhost:5000/campaign-details.html
```

Должен вернуть:
```
HTTP/1.1 200 OK
Content-Type: text/html
```

Если возвращает 404, значит проблема в пути к файлу.

## Структура URL в приложении

Все HTML файлы доступны без слеша в начале:
- ✅ `index.html`
- ✅ `login.html`
- ✅ `register.html`
- ✅ `dashboard.html`
- ✅ `admin.html`
- ✅ `campaign-details.html`

❌ НЕ `/campaign-details.html`

## Дополнительная диагностика

### 1. Проверьте логи сервера
В терминале, где запущен сервер, должны быть запросы:
```
GET /campaign-details.html 200
GET /css/style.css 200
GET /js/api.js 200
```

### 2. Проверьте Network в браузере
- Откройте Developer Tools (F12)
- Перейдите в Network
- Обновите страницу
- Найдите запрос к `campaign-details.html`
- Проверьте статус (должен быть 200, не 404)

### 3. Проверьте права доступа к файлам
```bash
ls -la frontend/campaign-details.html
```
Должно быть: `-rw-r--r--` (читаемый для всех)

## Финальная проверка

После исправлений проверьте весь флоу:

1. ✅ Главная страница открывается (`http://localhost:5000`)
2. ✅ Кампании отображаются
3. ✅ Кнопка "View Campaign" работает
4. ✅ Открывается страница деталей кампании
5. ✅ Показывается информация о кампании
6. ✅ Кнопка "Donate Now" появляется для активных кампаний
7. ✅ После логина можно сделать пожертвование

---

**Если проблема сохраняется, проверьте:**
1. Сервер запущен и работает на порту 5000
2. Файл campaign-details.html существует в папке frontend
3. В campaigns.js путь указан БЕЗ начального слеша
4. В app.js есть `app.use(express.static('frontend'))`
5. Node.js и все зависимости установлены
