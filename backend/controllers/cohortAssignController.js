import { pool } from '../config/database.js';

// Création d'un cohortAssignment
export const createCohortAssign = async (req, res) => {
    const { user_id, cohort_id } = req.body;
    try {
        await pool.query('INSERT INTO cohort_assignments (user_id, cohort_id) VALUES ($1, $2)', [user_id, cohort_id]);
        res.status(201).json({ message: 'Cohort assignment created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les affectations d'une cohorte
export const getAllAssignForOneCohort = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM cohort_assignments WHERE cohort_id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupération de tous les affectations d'un utilisateur
export const getAllAssignForOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM cohort_assignments WHERE user_id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Suppression d'un utilisateur d'une affectation
export const deleteUserFromCohortAssign = async (req,res) => {
    const { user_id, cohort_id } = req.body;
    try {
        await pool.query('DELETE FROM cohort_assignments WHERE user_id = $1 AND cohort_id = $2', [user_id, cohort_id]);
        res.status(200).json({ message: 'User deleted from cohort assignment successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

