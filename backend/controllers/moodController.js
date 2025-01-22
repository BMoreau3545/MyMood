import { pool } from '../config/database.js';

// Création d'un mood
exports.createMood = async (req, res) => {
    const { mood_score, user_id } = req.body;
    if (mood_score < 1 || mood_score > 100) {
        return res.status(400).json({ error: 'Mood score must be between 1 and 100' });
    }
    try {
        await pool.query('INSERT INTO moods (mood_score, user_id) VALUES ($1, $2)', [mood_score, user_id]);
        res.status(201).json({ message: 'Mood created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les moods pour un user
exports.getAllMoodsForOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM moods WHERE user_id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération du dernier mood pour un user
exports.getLastMoodForOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM moods WHERE user_id = $1 ORDER BY id DESC LIMIT 1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

