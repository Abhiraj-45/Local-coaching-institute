const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to Database
mongoose.connect('mongodb://127.0.0.1:27017/coaching_db');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

async function createAdmin() {
    // 1. Define the user
    const email = "admin@test.com";
    const password = "admin"; // This is the password you will type

    // 2. Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to Database
    const newUser = new User({ email, password: hashedPassword });
    
    try {
        await newUser.save();
        console.log("✅ User Created: admin@test.com / admin");
    } catch (e) {
        console.log("❌ User already exists or error");
    }
    process.exit();
}

createAdmin();