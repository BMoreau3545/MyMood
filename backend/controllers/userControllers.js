import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';

// Création d'un user
export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5)', [first_name, last_name, email, hashedPassword, role]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les users
export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération d'un user
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, email, password, role } = req.body;
    try {
        await pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, role = $5 WHERE id = $6', [first_name, last_name, email, password, role, id]);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un user
export const deleteUser = async (req,res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};