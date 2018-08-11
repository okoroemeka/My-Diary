DROP TABLE IF EXISTS entry CASCADE;
CREATE TABLE entry(
    id SERIAL PRIMARY KEY,
	title text NOT NULL,
	body text NOT NULL,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO entry(title,body) VALUES('good home','rome sweet home')