-- Migration number: 0001 	 2024-06-09T07:37:36.381Z
CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255) NOT NULL, message VARCHAR(500) NOT NULL, created_at DATETIME NOT NULL);
