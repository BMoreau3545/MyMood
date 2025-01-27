import { pool } from '../config/database.js'; // Importation de la configuration de la base de données

// Création d'une alerte
export const createAlert = async (req, res) => {
    const { user_id } = req.params; // Extraction de l'ID utilisateur des paramètres de la requête
    const { message } = req.body; // Extraction des données de la requête
    try {
        // Vérifier s'il existe déjà une alerte non résolue pour cet utilisateur
        const existingAlert = await pool.query('SELECT * FROM alerts WHERE user_id = $1 AND resolved_at IS NULL', [user_id]);
        if (existingAlert.rows.length > 0) {
            return res.status(400).json({ error: 'An unresolved alert already exists for this user' }); // Réponse en cas d'erreur
        }

        // Insertion d'une nouvelle alerte dans la base de données
        await pool.query('INSERT INTO alerts (user_id, alert_message) VALUES ($1, $2)', [user_id, message]);
        res.status(201).json({ message: 'Alert created successfully' }); // Réponse en cas de succès
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

// Récupération de toutes les alertes
export const getAlerts = async (req, res) => {
    try {
        // Sélection de toutes les alertes dans la base de données
        const result = await pool.query('SELECT * FROM alerts');
        res.status(200).json(result.rows); // Réponse avec toutes les alertes
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
}

// Récupération des alertes d'un utilisateur
export const getAlertByUser = async (req, res) => {
    const { user_id } = req.params; // Extraction de l'ID utilisateur des paramètres de la requête
    try {
        const result = await pool.query('SELECT * FROM alerts WHERE user_id = $1', [user_id]); // Sélection des alertes pour un utilisateur spécifique
        res.status(200).json(result.rows); // Réponse avec les alertes de l'utilisateur
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
}

// Récupération de toutes les alertes non résolues
export const getAlertsUnresolved = async (req, res) => {
    try {
        // Sélection de toutes les alertes non résolues dans la base de données
        const result = await pool.query('SELECT * FROM alerts WHERE resolved_at IS NULL');
        res.status(200).json(result.rows); // Réponse avec les alertes non résolues
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

// Résolution d'une alerte
export const resolveAlert = async (req, res) => {
    const { user_id } = req.params; // Extraction de l'ID de l'alerte des paramètres de la requête
    try {
        const existingUnresolvedAlert = await pool.query('SELECT * FROM alerts WHERE user_id = $1 AND resolved_at IS NULL', [user_id]); // Vérification de l'existence d'une alerte non résolue pour cet utilisateur
        if (existingUnresolvedAlert.rows.length === 0) {
            return res.status(404).json({ error: 'No unresolved alert found for this user' }); // Réponse en cas d'erreur
        }
        // Mise à jour de l'alerte pour la marquer comme résolue
        await pool.query('UPDATE alerts SET resolved_at = CURRENT_TIMESTAMP WHERE user_id = $1', [user_id]);
        res.status(200).json({ message: 'Alert resolved successfully' }); // Réponse en cas de succès
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

// Suppression d'une alerte
export const deleteAlert = async (req, res) => {
    const { alert_id } = req.params; // Extraction de l'ID de l'alerte des paramètres de la requête
    try {
        const existingAlert = await pool.query('SELECT * FROM alerts WHERE alert_id = $1', [alert_id]); // Vérification de l'existence de l'alerte
        if (existingAlert.rows.length === 0) {
            return res.status(404).json({ error: 'Alert not found' }); // Réponse en cas d'erreur
        }
        // Suppression de l'alerte de la base de données
        await pool.query('DELETE FROM alerts WHERE alert_id = $1', [alert_id]);
        res.status(200).json({ message: 'Alert deleted successfully' }); // Réponse en cas de succès
    } catch (error) {
        res.status(500).json({ error: error.message }); // Réponse en cas d'erreur
    }
};