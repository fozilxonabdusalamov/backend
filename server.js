const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Yoshlar Texnoparkiga xush kelibsiz!",
    version: "1.0.0",
    status: "Backend server ishlayapti!"
  });
});

// Test API endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: "API test muvaffaqiyatli!",
    timestamp: new Date().toISOString()
  });
});

// Users endpoint (oddiy misol)
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: "Alisher", email: "alisher@example.com" },
    { id: 2, name: "Dilnoza", email: "dilnoza@example.com" },
    { id: 3, name: "Kamron", email: "kamron@example.com" }
  ];
  
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// POST endpoint
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name va email kiritish majburiy!"
    });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: "User muvaffaqiyatli yaratildi!",
    data: newUser
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server xatosi yuz berdi!"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Bu yo'l topilmadi!"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portda ishga tushdi!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});
