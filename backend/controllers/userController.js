import { pool } from '../config/database.js';
import bcrypt from 'bcryptjs';

// Création d'un user
export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;
    console.log(await pool.query('SELECT * FROM pg_catalog.pg_tables'));
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
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un user
export const updateUser = async (req, res) => {
    const user_id = req.params.id;
    const { first_name, last_name, email, password, role } = req.body;
    try {
        // Récpérer les données actuelles de l'utilisateur
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Utiliser les valeurs actuelles si les nouvelles valeurs ne sont pas fournies
        const udaptedFirstName = first_name || user.first_name;
        const updatedLastName = last_name || user.last_name;
        const updatedEmail = email || user.email;
        const updatedRole = role || user.role;

        let updatedPassword = user.password;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // Mettre à jour l'utilisateur acvec les nouvelles valeurs
        await pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, role = $5 WHERE user_id = $6', [udaptedFirstName, updatedLastName, updatedEmail, updatedPassword, updatedRole, user_id]);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un user
export const deleteUser = async (req,res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};