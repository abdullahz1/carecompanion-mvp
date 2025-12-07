// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');

const app = express();
app.use(cors());
app.use(express.json());

// API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/reminders', reminderRoutes);

// CONNECT TO DB AND THEN START SERVER
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// ─────────────────────────────────────────────
// CRON JOB – check reminders every minute
// ─────────────────────────────────────────────
const Reminder = require('./models/Reminder');

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const due = await Reminder.find({
      dateTime: { $lte: now },
      notified: false
    }).populate('user');

    for (const r of due) {
      console.log(`Reminder DUE for ${r.user?.email || r.user}: ${r.title} at ${r.dateTime}`);
      r.notified = true;
      await r.save();
    }
  } catch (e) {
    console.error('Cron error:', e);
  }
});
