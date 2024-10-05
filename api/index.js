const QRCode = require('qrcode');
const { send } = require('micro');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    send(res, 404, { error: 'Only POST requests are allowed' });
    return;
  }

  const { url, color } = req.body;

  if (!url) {
    send(res, 400, { error: 'URL is required' });
    return;
  }

  try {
    const qrOptions = {
      color: {
        dark: color || '#000000', // Default to black if no color is provided
        light: '#FFFFFF', // Default background color (white)
      },
    };

    const qrCodeDataURL = await QRCode.toDataURL(url, qrOptions);
    send(res, 200, { qrCodeDataURL });
  } catch (error) {
    send(res, 500, { error: 'Failed to generate QR code' });
  }
};