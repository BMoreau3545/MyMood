-- Création de la table Users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('student', 'supervisor', 'administrator')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Cohortes
CREATE TABLE cohorts (
    cohort_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Affectations de Cohortes
CREATE TABLE cohort_assignments (
    cohort_id INT REFERENCES cohorts(cohort_id),
    user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cohort_id, user_id)
);

-- Création de la table Historique des Humeurs
CREATE TABLE mood_history (
    history_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    mood_score INT NOT NULL CHECK (mood_score BETWEEN 1 and 100),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table Alertes
CREATE TABLE alerts (
    alert_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN DEFAULT TRUE,
    resolved_at TIMESTAMP
);

-- Création de la table Blacklist
CREATE TABLE blacklist (
    supervisor_id INT REFERENCES users(user_id),
    student_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (supervisor_id <> student_id),
    PRIMARY KEY (supervisor_id, student_id)
);