// Send email via Resend HTTP API
// (DigitalOcean blocks SMTP ports, so we use the REST API)
const sendEmail = async (options) => {
  const body = JSON.stringify({
    from: process.env.EMAIL_FROM,
    to: [options.email],
    subject: options.subject,
    html: options.message,
  });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EMAIL_PASSWORD}`,
        'Content-Type': 'application/json',
      },
      body,
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      throw new Error(data.message || 'Email could not be sent');
    }

    console.log('Email sent successfully, id:', data.id);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
