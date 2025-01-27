import { pool } from '../config/database.js';

// Création d'un cohort
export const createCohort = async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO cohorts (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Cohort created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les cohorts
export const getAllCohorts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cohorts');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération d'une cohort
export const getCohort = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM cohorts WHERE cohort_id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mise à jour d'un cohort
export const updateCohort = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        await pool.query('UPDATE cohorts SET name = $1 WHERE cohort_id = $2', [name, id]);
        res.status(200).json({ message: 'Cohort updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un cohort
export const deleteCohort = async (req,res) => {
    const id = req.params.id;
    try {
        await pool.query('DELETE FROM cohorts WHERE cohort_id = $1', [id]);
        res.status(200).json({ message: 'Cohort deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};