DROP USER IF EXISTS hangman;
DROP DATABASE IF EXISTS game;

CREATE USER hangman WITH PASSWORD 'hangman';
CREATE DATABASE game;

GRANT ALL PRIVILEGES ON DATABASE game TO hangman;

\c hangman

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Messageboard (
    id   uuid      DEFAULT uuid_generate_v4() PRIMARY KEY,
    time timestamp DEFAULT now(),
    msg  text
);

INSERT INTO Messageboard (msg) VALUES
( 'these are three default messages' ),
( 'delivered from the server' ),
( 'using a custom route' );

SELECT * FROM Messageboard;
