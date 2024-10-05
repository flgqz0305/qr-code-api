const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Allow JSON body parsing

// QR Code Generation API Endpoint
app.post('/generate', async (req, res) => {
  const { url, color } = req.body;

  // Validation: Ensure a URL is provided
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Set QR code options with optional color
    const qrOptions = {
      color: {
        dark: color || '#000000', // Default to black if no color is provided
        light: '#FFFFFF', // Default background color (white)
      },
    };

    // Generate QR code as a base64 image
    const qrCodeDataURL = await QRCode.toDataURL(url, qrOptions);

    // Return the QR code as JSON
    res.json({ qrCodeDataURL });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`QR Code Generator API is running on port ${PORT}`);
});