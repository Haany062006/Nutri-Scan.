const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");
const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { data: existingUser } = await supabase.from("users").select("*").eq("email", email).single();
    if (existingUser) return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error } = await supabase.from("users").insert([{ name, email, password: hashedPassword }]).select().single();
    if (error) throw error;
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
    res.status(201).json({ token, name: newUser.name, message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single();
    if (error || !user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, name: user.name, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
