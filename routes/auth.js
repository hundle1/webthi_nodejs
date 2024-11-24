const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/author');
const router = express.Router();

// Trang login
router.get('/login', (req, res) => {
  res.render('login');
});

// Xử lý login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('Tài khoản không tồn tại.');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).send('Sai mật khẩu.');
  }

  // Phân quyền và chuyển hướng
  if (user.role === 'admin') {
    res.redirect('/admin');
  } else {
    res.redirect('/user');
  }
});

// Trang dành cho user
router.get('/user', (req, res) => {
  res.render('user', { message: 'Chào mừng người dùng!' });
});

// Trang dành cho admin
router.get('/admin', (req, res) => {
  res.render('admin', { message: 'Chào mừng admin!' });
});

module.exports = router;
