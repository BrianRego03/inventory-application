require("dotenv").config();

const createTables=`
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    release_year INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS movie_directors (
    movie_id INTEGER,
    people_id INTEGER,
    PRIMARY KEY (movie_id, people_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS movie_genres (
    movie_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS movie_actors (
    movie_id INTEGER,
    people_id INTEGER,
    PRIMARY KEY (movie_id, people_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE
);

`;

const insertMovies=`
INSERT INTO movies (name,release_year)
VALUES
("Interstellar",2014),
("Nosferatu",2025),
("Superman",2025),
("The Dark Knight Rises",2012),
("Juror #2",2024 ),
("Goodfellas",1990),
("The Good, the Bad & the Ugly",1966);
`;




