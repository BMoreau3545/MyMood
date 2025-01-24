import { pool } from '../config/database.js'; // Importation de la configuration de la base de données

// Création d'une alerte
export const createAlert = async (req, res) => {
    const { user_id, message } = req.body; // Extraction des données de la requête
    try {
        // Insertion d'une nouvelle alerte dans la base de données
        await pool.query('INSERT INTO alerts (user_id, alert_message, resolved) VALUES ($1, $2, FALSE)', [user_id, message]);
        res.status(201).json({ message: 'Alert created successfully' }); // Réponse en cas de succès
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

// Récupération de toutes les alertes non résolues
export const getAlertsUnresolved = async (req, res) => {
    try {
        // Sélection de toutes les alertes non résolues dans la base de données
        const result = await pool.query('SELECT * FROM alerts WHERE resolved = FALSE');
        res.status(200).json(result.rows); // Réponse avec les alertes non résolues
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

// Récupération de l'alerte d'un utilisateur lorsqu'elle n'est pas résolue
export const getAlertByUserUnresolved = async (req, res) => {
    const { user_id } = req.params; // Extraction de l'ID utilisateur des paramètres de la requête
    try {
        // Sélection des alertes non résolues pour un utilisateur spécifique
        const result = await pool.query('SELECT * FROM alerts WHERE user_id = $1 AND resolved = FALSE', [user_id]);
        res.status(200).json(result.rows); // Réponse avec les alertes non résolues de l'utilisateur
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

// Résolution d'une alerte
export const resolveAlert = async (req, res) => {
    const { id } = req.params; // Extraction de l'ID de l'alerte des paramètres de la requête
    try {
        // Mise à jour de l'alerte pour la marquer comme résolue
        await pool.query('UPDATE alerts SET resolved = TRUE WHERE id = $1', [id]);
        res.status(200).json({ message: 'Alert resolved successfully' }); // Réponse en cas de succès
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};