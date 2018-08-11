 DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
	firstname VARCHAR NOT NULL,
	lastname VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
    password VARCHAR  NOT NULL,
    image_url VARCHAR,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(firstname,lastname,email,password) VALUES('EMEKA', 'OKORO', 'okoroEmeka@gmail.com','okoruio')