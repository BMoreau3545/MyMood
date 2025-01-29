import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

// Fonction de connexion
export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.sendStatus(401);
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24,
            priority: 'high',
            signed: true,
        });
        res.status(200).json({ id: user.user_id, role: user.role });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export async function logout(req, res) {
    res.clearCookie('auth');
    res.sendStatus(200);
}