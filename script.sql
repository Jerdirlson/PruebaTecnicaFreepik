CREATE DATABASE IF NOT EXISTS prueba_tecnica;

USE prueba_tecnica;

CREATE TABLE IF NOT EXISTS `User` (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    numId INT,
    nameUser VARCHAR(255) NOT NULL,
    emailUser VARCHAR(255) NOT NULL,
    pwdUser VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS League (
    league_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Country (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Player_Position (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Nationality (
    nationality_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Team (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    league_id INT,
    country_id INT,
    FOREIGN KEY (league_id) REFERENCES League(league_id),
    FOREIGN KEY (country_id) REFERENCES Country(country_id)
);

CREATE TABLE IF NOT EXISTS Player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    team_id INT,
    squad_number INT,
    position_id INT,
    nationality_id INT,
    FOREIGN KEY (team_id) REFERENCES Team(team_id),
    FOREIGN KEY (position_id) REFERENCES Player_Position(position_id),
    FOREIGN KEY (nationality_id) REFERENCES Nationality(nationality_id)
);

INSERT INTO League (name) VALUES
('Premier League'),
('La Liga'),
('Bundesliga'),
('Serie A');

INSERT INTO Country (name) VALUES
('England'),
('Spain'),
('Germany'),
('Italy');

INSERT INTO Player_Position (name) VALUES
('Forward'),
('Midfielder'),
('Defender');

INSERT INTO Nationality (name) VALUES
('England'),
('Argentina'),
('Germany'),
('Portugal');

INSERT INTO Team (name, league_id, country_id) VALUES
('Manchester United', 1, 1),
('Real Madrid', 2, 2),
('Bayern Munich', 3, 3),
('Juventus', 4, 4);

INSERT INTO prueba_tecnica.`User` (numId,nameUser,emailUser,pwdUser) VALUES
	 (NULL,'Prueba','prueba@gmail.com','$2a$10$PbUWT6.ktjHqvxs6/c4pKuAKDJ//0yTGSRxj48YgazLBypaYjUQsa');

INSERT INTO Player (name, age, team_id, squad_number, position_id, nationality_id) VALUES
('Harry Kane', 28, 1, 10, 1, 1),
('Lionel Messi', 34, 2, 10, 1, 2),
('Robert Lewandowski', 33, 3, 9, 1, 3),
('Cristiano Ronaldo', 37, 4, 7, 1, 4);
DELIMITER $$

CREATE PROCEDURE GetAllTeamsAndPlayers()
BEGIN
    SELECT
        t.team_id,
        t.name AS team_name,
        l.league_id AS league_id,
        c.country_id AS country_id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'player_id', p.player_id,
                'player_name', p.name,
                'age', p.age,
                'position_name', pp.name,
                'nationality_name', n.name,
                'squad_number', p.squad_number
            )
        ) AS players
    FROM
        Team t
    INNER JOIN
        League l ON t.league_id = l.league_id
    INNER JOIN
        Country c ON t.country_id = c.country_id
    LEFT JOIN
        Player p ON p.team_id = t.team_id
    LEFT JOIN
        Player_Position pp ON p.position_id = pp.position_id
    LEFT JOIN
        Nationality n ON p.nationality_id = n.nationality_id
    GROUP BY
        t.team_id;
END$$

CREATE PROCEDURE TeamDeleter(IN equipo_id INT)
BEGIN
    UPDATE Player SET team_id = NULL WHERE team_id = equipo_id;
    DELETE FROM Team WHERE team_id = equipo_id;
END$$

CREATE PROCEDURE PlayerDeleter(IN p_player_id INT)
BEGIN
    DELETE FROM Player WHERE player_id = p_player_id;
END$$

DELIMITER ;
