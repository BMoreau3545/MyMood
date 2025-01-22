import { pool } from '../config/database.js';

// Création d'une blacklist
export const createBlacklist = async (req, res) => {
    const { supervisor_id, student_id } = req.body;
    try {
        await pool.query('INSERT INTO blacklist (supervisor_id, student_id) VALUES ($1, $2)', [supervisor_id, student_id]);
        res.status(201).json({ message: 'Blacklist created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de toutes les blacklist d'un superviseur
export const getBlacklistBySupervisor = async (req, res) => {
    const { supervisor_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM blacklist WHERE supervisor_id = $1', [supervisor_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de toutes les blacklist d'un étudiant
export const getBlacklistByStudent = async (req, res) => {
    const { student_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM blacklist WHERE student_id = $1', [student_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'une blacklist en fonction de l'id du superviseur et de l'étudiant
export const deleteBlacklist = async (req, res) => {
    const { supervisor_id, student_id } = req.params;
    try {
        await pool.query('DELETE FROM blacklist WHERE supervisor_id = $1 AND student_id = $2', [supervisor_id, student_id]);
        res.status(200).json({ message: 'Blacklist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};