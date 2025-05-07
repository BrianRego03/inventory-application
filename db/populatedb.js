const { Client } = require("pg");

require("dotenv").config();

const clearTable = `
    DROP TABLE IF EXISTS movies CASCADE;
    DROP TABLE IF EXISTS genres CASCADE;
    DROP TABLE IF EXISTS people CASCADE;
    DROP TABLE IF EXISTS movie_directors CASCADE;
    DROP TABLE IF EXISTS movie_genres CASCADE;
    DROP TABLE IF EXISTS movie_actors CASCADE;
`;
const createTables=`
CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    release_year INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
('Interstellar',2014),
('Nosferatu',2025),
('Superman',2025),
('The Dark Knight Rises',2012),
('Juror #2',2024 ),
('Goodfellas',1990),
('The Good, the Bad & the Ugly',1966);
`;

const insertGenres = `
INSERT INTO genres (name)
VALUES
('Sci-Fi'),
('Action'),
('Adventure'),
('Drama'),
('Horror'),
('Fantasy'),
('Superhero'),
('Crime'),
('Biography'),
('Western');
`;

const insertPeople = `
INSERT INTO people (name)
VALUES
('Christopher Nolan'),
('Matthew McConaughey'),
('Anne Hathaway'),
('Matt Damon'),
('Michael Caine'),
('Jessica Chastain'),
('Robert Eggers'),
('Lily-Rose Depp'),
('Nicholas Hoult'),
('James Gunn'),
('David Corenswet'),
('Rachel Brosnahan'),
('Nathan Fillion'),
('Christian Bale'),
('Tom Hardy'),
('Clint Eastwood'),
('Toni Collette'),
('Zoey Deutch'),
('Martin Scorsese'),
('Ray Liotta'),
('Robert De Niro'),
('Joe Pesci'),
('Eli Wallach'),
('Lee Van Cleef');
`;




const insertMovieDirectors=`
INSERT INTO movie_directors (movie_id,people_id)
VALUES
(1,1),
(2,7),
(3,10),
(4,1),
(5,16),
(6,19),
(7,16);
`

const insertMovieGenres=`
INSERT INTO movie_genres (movie_id,genre_id)
VALUES
(1,1),(1,2),(1,3),
(2,5),(2,6),
(3,1),(3,2),(3,3),(3,7),
(4,2),(4,3),(4,7),(4,8),
(5,4),(5,9),
(6,8),(6,9),(6,4),
(7,2),(7,3),(7,10);
`;

const insertMovieActors=`
INSERT INTO movie_actors (movie_id,people_id)
VALUES
(1,2),(1,3),(1,4),(1,5),(1,6),
(2,8),(2,9),
(3,9),(3,11),(3,12),(3,13),
(4,14),(4,15),(4,3),(4,5),
(5,9),(5,17),(5,18),
(6,20),(6,21),(6,22),
(7,16),(7,23),(7,24);
`;


async function main() {
    console.log("seeding");
    const client=new Client({
        connectionString:process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(clearTable);
    await client.query(createTables);
    await client.query(insertMovies);
    await client.query(insertGenres);
    await client.query(insertPeople);
    await client.query(insertMovieDirectors);
    await client.query(insertMovieGenres);
    await client.query(insertMovieActors);
    await client.end();
    console.log("done");
    
}

main();

