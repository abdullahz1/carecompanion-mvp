// server/routes/reminders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Reminder = require('../models/Reminder');

// Get all reminders for authenticated user
router.get('/', auth, async (req, res) => {
  const reminders = await Reminder.find({ user: req.user.id }).sort('dateTime');
  res.json(reminders);
});

// Create reminder
router.post('/', auth, async (req, res) => {
  const { title, notes, dateTime } = req.body;
  try {
    if (!title || !dateTime) return res.status(400).json({ msg: 'title and dateTime required' });
    const r = new Reminder({ user: req.user.id, title, notes, dateTime });
    await r.save();
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  const { title, notes, dateTime } = req.body;
  const updated = await Reminder.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, notes, dateTime },
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ ok: true });
});

module.exports = router;
