const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());




// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
 message: String
});
const Contact = mongoose.model('Contact', ContactSchema);

// API route
app.post('/api/contact', async (req, res) => {
 const { name, email, message } = req.body;

  console.log("New contact form submission:", { name, email, message }); // 👈 Log incoming data

  try {
    await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Submitted successfully' });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
