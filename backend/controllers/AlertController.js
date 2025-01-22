import { pool } from '../config/database.js';

// Création d'une alerte
exports.createAlert = async (req, res) => {
    const { user_id } = req.body;
    try {
        await pool.query('INSERT INTO alerts (user_id, resolved) VALUES ($1, FALSE)', [user_id]);
        res.status(201).json({ message: 'Alert created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de toutes les alertes non résolues
exports.getAlertsUnresolved = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alerts WHERE resolved = FALSE');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de l'alerte d'un utilisateur lorsqu'elle n'est pas résolue
exports.getAlertByUserUnresolved = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM alerts WHERE user_id = $1 AND resolved = FALSE', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Résolution d'une alerte
exports.resolveAlert = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE alerts SET resolved = TRUE WHERE id = $1', [id]);
        res.status(200).json({ message: 'Alert resolved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
