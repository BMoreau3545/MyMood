import { pool } from '../config/database.js';

// Création d'un cohort
exports.createCohort = async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO cohorts (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Cohort created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les cohorts
exports.getAllCohorts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cohorts');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération d'un cohort
exports.getCohort = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM cohorts WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un cohort
exports.updateCohort = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        await pool.query('UPDATE cohorts SET name = $1 WHERE id = $2', [name, id]);
        res.status(200).json({ message: 'Cohort updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un cohort
exports.deleteCohort = async (req,res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM cohorts WHERE id = $1', [id]);
        res.status(200).json({ message: 'Cohort deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};