import { pool } from '../config/database.js';

// Création d'un mood
export const createMood = async (req, res) => {
    const { user_id } = req.params;
    const { mood_score } = req.body;
    if (mood_score < 1 || mood_score > 100) {
        return res.status(400).json({ error: 'Mood score must be between 1 and 100' });
    }
    try {
        await pool.query('INSERT INTO mood_history (mood_score, user_id) VALUES ($1, $2)', [mood_score, user_id]);
        res.status(201).json({ message: 'Mood created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les moods pour un user
export const getAllMoodsForOneUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM mood_history WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération du dernier mood pour un user
export const getLastMoodForOneUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM mood_history WHERE user_id = $1 ORDER BY recorded_at DESC LIMIT 1', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

