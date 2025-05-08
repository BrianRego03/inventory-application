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
    release_year INTEGER NOT NULL,
    url TEXT CHECK (url ~* '^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$')
);
CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    url TEXT CHECK (url ~* '^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$')

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
INSERT INTO movies (name,release_year,url)
VALUES
('Interstellar',2014,'https://a.ltrbxd.com/resized/film-poster/1/1/7/6/2/1/117621-interstellar-0-1000-0-1500-crop.jpg?v=7ad89e6666'),
('Nosferatu',2025,'https://a.ltrbxd.com/resized/film-poster/3/5/9/5/0/5/359505-nosferatu-2024-0-1000-0-1500-crop.jpg?v=a12d4ad648'),
('Superman',2025,'https://a.ltrbxd.com/resized/film-poster/9/5/7/0/5/0/957050-superman-2025-0-1000-0-1500-crop.jpg?v=54e41a55ff'),
('The Dark Knight Rises',2012,'https://a.ltrbxd.com/resized/film-poster/1/6/5/5/0/16550-the-dark-knight-rises-0-1000-0-1500-crop.jpg?v=a7db2d4314'),
('Juror #2',2024,'https://a.ltrbxd.com/resized/film-poster/9/9/7/7/2/2/997722-juror-2-0-1000-0-1500-crop.jpg?v=14601fa694'),
('Goodfellas',1990,'https://a.ltrbxd.com/resized/film-poster/5/1/3/8/3/51383-goodfellas-0-1000-0-1500-crop.jpg?v=c6c265f228'),
('The Good, the Bad & the Ugly',1966,'https://a.ltrbxd.com/resized/film-poster/5/1/6/6/6/51666-the-good-the-bad-and-the-ugly-0-1000-0-1500-crop.jpg?v=9474a84e63');
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
INSERT INTO people (name,url)
VALUES
('Christopher Nolan','https://image.tmdb.org/t/p/w342/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg'),
('Matthew McConaughey','https://image.tmdb.org/t/p/w342/lCySuYjhXix3FzQdS4oceDDrXKI.jpg'),
('Anne Hathaway','https://image.tmdb.org/t/p/w342/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg'),
('Matt Damon','https://image.tmdb.org/t/p/w342/4KAxONjmVq7qcItdXo38SYtnpul.jpg'),
('Michael Caine','https://image.tmdb.org/t/p/w342/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg'),
('Jessica Chastain','https://image.tmdb.org/t/p/w342/xRvRzxiiHhgUErl0yf9w8WariRE.jpg'),
('Robert Eggers','https://image.tmdb.org/t/p/w342/xdN30BowN6uLjeNXYWWZINeht12.jpg'),
('Lily-Rose Depp','https://image.tmdb.org/t/p/w342/cvBXqmj3waqMUQ7yhQljAUhAivX.jpg'),
('Nicholas Hoult','https://image.tmdb.org/t/p/w342/laeAYQVBV9U3DkJ1B4Cn1XhpT8P.jpg'),
('James Gunn','https://image.tmdb.org/t/p/w342/2kFzvqCGeYBrgbuuvvyGE75d9gM.jpg'),
('David Corenswet','https://image.tmdb.org/t/p/w342/kPxoeGBVRb4goUVmi4Qpg0lLnYW.jpg'),
('Rachel Brosnahan','https://image.tmdb.org/t/p/w342/6kFrUqfHy3PYNxKtTWAu8F54xB8.jpg'),
('Nathan Fillion','https://image.tmdb.org/t/p/w342/aW6vCxkUZtwb6iH2Wf88Uq0XNVv.jpg'),
('Christian Bale','https://image.tmdb.org/t/p/w342/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg'),
('Tom Hardy','https://image.tmdb.org/t/p/w342/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg'),
('Clint Eastwood','https://image.tmdb.org/t/p/w342/8TwdCfeOZH7ucRlfLZ6wObxa7cO.jpg'),
('Toni Collette','https://image.tmdb.org/t/p/w342/lzXRh16qe4HHeBN6tMyw0DHvaMn.jpg'),
('Zoey Deutch','https://image.tmdb.org/t/p/w342/csmSAm3vpJj9lB5vb5fTbRqOw9C.jpg'),
('Martin Scorsese','https://image.tmdb.org/t/p/w342/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg'),
('Ray Liotta','https://image.tmdb.org/t/p/w342/jdwGJbJNSRQiG2kB5MJxiu2clCQ.jpg'),
('Robert De Niro','https://image.tmdb.org/t/p/w342/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg'),
('Joe Pesci','https://image.tmdb.org/t/p/w342/1WHLXwT0TDZDWFVRcFve1B0EjNK.jpg'),
('Eli Wallach','https://image.tmdb.org/t/p/w342/s452wxFLaOwAIs6juD0rrvxaFxL.jpg'),
('Lee Van Cleef','https://image.tmdb.org/t/p/w342/yQc5wjNCdRZzPp5E2wRPRYsEq9a.jpg');
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

