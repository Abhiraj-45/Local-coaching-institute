const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/coaching_db')
.then(() => console.log('✅ MongoDB Connected!'))
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// Schemas
const enquirySchema = new mongoose.Schema({
    name: String,
    phone: String,
    course: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Enquiry = mongoose.model('Enquiry', enquirySchema);

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// --- ROUTES ---

// 1. REGISTER
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const role = (email === 'admin@test.com') ? 'admin' : 'user';
        res.json({ message: 'Login successful', success: true, role: role });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// 3. ENQUIRY (Yeha change kiya hai - Terminal Log)
app.post('/api/enquire', async (req, res) => {
    try {
        // TERMINAL ME DATA PRINT KAREGA
        console.log("📩 New Enquiry Received:", req.body); 

        await new Enquiry(req.body).save();
        res.status(201).json({ message: 'Saved' });
    } catch (error) { res.status(500).json({ error: 'Error saving' }); }
});

app.get('/api/enquire', async (req, res) => {
    try {
        const enquiries = await Enquiry.find(); 
        res.json(enquiries);
    } catch (error) { res.status(500).json({ error: 'Error fetching' }); }
});

app.delete('/api/enquire/:id', async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: 'Error deleting' }); }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});