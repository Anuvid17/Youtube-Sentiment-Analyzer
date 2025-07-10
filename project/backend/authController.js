// authController.js
import pool from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0], token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body; // Allow login with either username or email

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Please provide username/email and password.' });
  }

  try {
    // Fetch user with either username or email
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [identifier]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare password with stored hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send successful response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
};

export { register, login };