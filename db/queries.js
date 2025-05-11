const pool=require("./pool");

async function fetchAllMovies() {
    const {rows}=await pool.query("SELECT * FROM movies");
    console.log(rows);
    return rows;
}

async function fetchAllGenresDB() {
    const {rows}=await pool.query("SELECT * FROM genres");
    console.log(rows);
    return rows;
}

async function fetchAllPeople() {
    const {rows}=await pool.query("SELECT * FROM people");
    console.log(rows);
    return rows;
}

async function fetchMovieByIdentity(id) {
    // const {rows}=await pool.query("SELECT * FROM movies WHERE movies.id=$1",[id]);
    const movieQuery=`SELECT m.name AS moviename,
                            m.release_year AS year,
                            m.url AS url,
                            m.id AS id,
                            COALESCE(g.genres,'{}'::JSON[]) AS genres,
                            COALESCE(a.actors,'{}'::JSON[]) AS actors,
                            COALESCE(d.directors,'{}'::JSON[]) AS directors
                      FROM movies m
                      LEFT JOIN (
                            SELECT mg.movie_id,
                                    ARRAY_AGG(JSON_BUILD_OBJECT('gname',g.name,'gid',g.id)
                                    ) AS genres
                            FROM movie_genres mg
                            LEFT JOIN genres g ON mg.genre_id=g.id
                            GROUP BY mg.movie_id         
                      ) g ON m.id=g.movie_id
                      LEFT JOIN (
                            SELECT ma.movie_id,
                                    ARRAY_AGG(JSON_BUILD_OBJECT('aname',p.name,'aid',p.id,'aurl',p.url)
                                    ) AS actors
                            FROM movie_actors ma
                            LEFT JOIN people p ON ma.people_id=p.id
                            GROUP BY movie_id        
                      ) a ON m.id=a.movie_id
                      LEFT JOIN (
                            SELECT md.movie_id,
                                    ARRAY_AGG(JSON_BUILD_OBJECT('dname',p.name,'did',p.id,'durl',p.url)
                                    ) AS directors                                    
                            FROM movie_directors md
                            LEFT JOIN people p ON md.people_id=p.id
                            GROUP BY movie_id        
                      ) d ON m.id=d.movie_id
                       where m.id=$1  `
    const {rows}=await pool.query(movieQuery,[id]);
    // console.log(rows);
    return rows[0];
}

async function fetchGenreMovies(id){
    const genreQuery=`SELECT g.name as genrename,
                            g.id as id,
                            COALESCE(m.genremovies,'{}'::JSON[]) AS genremovies
                       FROM genres g
                       LEFT JOIN(
                            SELECT mg.genre_id,
                                    ARRAY_AGG(
                                        JSON_BUILD_OBJECT('movie_id',m.id,'movie_name',m.name,'movie_url',m.url)
                                    ) AS genremovies
                            FROM movie_genres mg
                            LEFT JOIN movies m ON mg.movie_id=m.id
                            GROUP BY genre_id     
                       ) m ON g.id=m.genre_id
                        where g.id=$1                       
                       `
    const {rows}=await pool.query(genreQuery,[id]);
    return rows[0];                   
}

async function fetchActorMovies(id){
    const actorQuery=`SELECT p.name as actorname,
                            p.url as actorurl,
                            p.id as id,
                            COALESCE(a.actormovies,'{}'::JSON[]) AS actormovies,
                            COALESCE(d.directormovies,'{}'::JSON[]) AS directormovies

                       FROM people p
                       LEFT JOIN(
                            SELECT ma.people_id,
                                    ARRAY_AGG(
                                        JSON_BUILD_OBJECT('movie_id',m.id,'movie_name',m.name,'movie_url',m.url)
                                    ) AS actormovies
                            FROM movie_actors ma
                            LEFT JOIN movies m ON ma.movie_id=m.id
                            GROUP BY people_id     
                       ) a ON p.id=a.people_id
                        LEFT JOIN(
                            SELECT md.people_id,
                                    ARRAY_AGG(
                                        JSON_BUILD_OBJECT('movie_id',m.id,'movie_name',m.name,'movie_url',m.url)
                                    ) as directormovies
                            FROM movie_directors md
                            LEFT JOIN movies m ON md.movie_id=m.id
                            GROUP BY people_id        
                        ) d ON p.id=d.people_id
                        
                        WHERE p.id=$1                       
                       `
    const {rows}=await pool.query(actorQuery,[id]);
    return rows[0];                   
}

async function deleteMovieByIdentity(id){
    const deleteMovie=`DELETE FROM movies WHERE movies.id=$1`
    const {rows}=await pool.query(deleteMovie,[id]);
    return;

}

async function deleteGenreByIdentity(id){
    const deleteGenre=`DELETE FROM genres WHERE genres.id=$1`
    const {rows}=await pool.query(deleteGenre,[id]);
    return;

}

async function deleteActorByIdentity(id){
    const deleteActor=`DELETE FROM people WHERE people.id=$1`
    const {rows}=await pool.query(deleteActor,[id]);
    return;

}

async function fetchAllPeople() {
    const {rows}=await pool.query("SELECT * FROM people");
    console.log(rows);
    return rows;
}

async function fetchAllGenres() {
    const {rows}=await pool.query("SELECT * FROM genres");
    console.log(rows);
    return rows;
}

async function createMovieInDB(moviename,movieurl,movieyear,directorID,actorID,genreID) {
    if (moviename && movieurl){
            const movieCreate=`INSERT INTO movies (name,url,release_year)
                        VALUES($1,$2,$3)
                        RETURNING id`;
            const {rows}=await pool.query(movieCreate,[moviename,movieurl,movieyear]);
            movieid=rows[0].id;
            if(directorID){
                for (let i = 0; i < directorID.length; i++) {
                    const movieCreateDirector = `INSERT INTO movie_directors(movie_id,people_id)
                                            VALUES($1,$2)`;
                    await pool.query(movieCreateDirector, [movieid, directorID[i]]);

                }
                          
            }
            if(actorID){
                for (let i = 0; i < actorID.length; i++) {
                    const movieCreateActor = `INSERT INTO movie_actors(movie_id,people_id)
                                            VALUES($1,$2)`;
                    await pool.query(movieCreateActor, [movieid, actorID[i]]);

                }


                          
            }
            if (genreID) {
                for (let i = 0; i < genreID.length; i++) {
                    const movieCreateGenres = `INSERT INTO movie_genres(movie_id,genre_id)
                                                VALUES($1,$2)`;
                    await pool.query(movieCreateGenres, [movieid, genreID[i]]);
                }


            }
            
            return movieid;
    }
    return;
                 

    
}

async function createGenreInDB(genrename,movieID) {
    if (genrename){
            const genreCreate=`INSERT INTO genres (name)
                        VALUES($1)
                        RETURNING id`;
            const {rows}=await pool.query(genreCreate,[genrename]);
            genreid=rows[0].id;
            if(movieID){
                for (let i = 0; i < movieID.length; i++) {
                    const genreCreateMovies = `INSERT INTO movie_genres(movie_id,genre_id)
                                            VALUES($1,$2)`;
                    await pool.query(genreCreateMovies, [movieID[i], genreid]);

                }
                          
            }
            
            
            return genreid;
    }
    return;
                 

    
}

async function createPersonInDB(personname,personurl,directedID,actedID) {
    if (personname){
            const personCreate=`INSERT INTO people (name,url)
                        VALUES($1,$2)
                        RETURNING id`;
            const {rows}=await pool.query(personCreate,[personname,personurl]);
            personid=rows[0].id;
            if(directedID){
                for (let i = 0; i < directedID.length; i++) {
                    const personCreateDirected = `INSERT INTO movie_directors(movie_id,people_id)
                                            VALUES($1,$2)`;
                    await pool.query(personCreateDirected, [directedID[i], personid]);

                }
                          
            }
            if (actedID) {
                for (let i = 0; i < actedID.length; i++) {
                    const personCreateActed = `INSERT INTO movie_actors(movie_id,people_id)
                                                VALUES($1,$2)`;
                    await pool.query(personCreateActed, [actedID[i], personid]);

                }

            }
            
            
            return personid;
    }
    return;
                 

    
}

async function updateMovieInDB(moviename,movieurl,movieyear,movieidentity,directorID,actorID,genreID) {
    if (moviename && movieurl){
            const movieUpdate=`UPDATE movies 
                        SET name=$1,url=$2,release_year=$3 
                        WHERE id=$4
                        RETURNING id`;
            const {rows}=await pool.query(movieUpdate,[moviename,movieurl,movieyear,movieidentity]);
            movieid=rows[0].id;
            if(directorID){
                await pool.query(
                `DELETE FROM movie_directors 
                 WHERE movie_id = $1 AND people_id NOT IN (${directorID.join(",")})`,
                [movieid]
            );
            for (const director of directorID) {
                const directorInsert = `
                    INSERT INTO movie_directors (movie_id, people_id) 
                    VALUES ($1, $2) 
                    ON CONFLICT (movie_id, people_id) DO NOTHING;
                `;
                await pool.query(directorInsert, [movieid, director]);
            }
                          
            }
            if(actorID){
                await pool.query(
                    `DELETE FROM movie_actors
                    WHERE movie_id=$1 AND people_id NOT IN (${actorID.join(",")})`,[movieid]
                )
                for (const actor of actorID) {
                    const actorInsert = `INSERT INTO movie_actors(movie_id,people_id)
                                            VALUES($1,$2)
                                            ON CONFLICT(movie_id,people_id) DO NOTHING`;
                    await pool.query(actorInsert, [movieid, actor]);

                }


                          
            }
            if(genreID){
                await pool.query(
                    `DELETE FROM movie_genres
                    WHERE movie_id=$1 AND genre_id NOT IN (${genreID.join(",")})`,[movieid]
                )
                for (const genre of genreID) {
                    const genreInsert = `INSERT INTO movie_genres(movie_id,genre_id)
                                            VALUES($1,$2)
                                            ON CONFLICT(movie_id,genre_id) DO NOTHING`;
                    await pool.query(genreInsert, [movieid, genre]);

                }


                          
            }
            
            return movieid;
    }
    return;
                 

    
}


async function updatePersonInDB(personname,personurl,personid,directedID,actedID) {
    if (personname){

            const personUpdate=`UPDATE people 
                        SET name=$1,url=$2 
                        WHERE id=$3
                        RETURNING id`;            
            const {rows}=await pool.query(personUpdate,[personname,personurl,personid]);
            personid=rows[0].id;

            if(actedID){
                await pool.query(
                    `DELETE FROM movie_actors
                    WHERE people_id=$1 AND movie_id NOT IN (${actedID.join(",")})`,[personid]
                )
                for (const movie of actedID) {
                    const actedInsert = `INSERT INTO movie_actors(movie_id,people_id)
                                            VALUES($1,$2)
                                            ON CONFLICT(movie_id,people_id) DO NOTHING`;
                    await pool.query(actedInsert, [movie, personid]);

                }


            } 
            if(directedID){
                await pool.query(
                    `DELETE FROM movie_directors
                    WHERE people_id=$1 AND movie_id NOT IN (${directedID.join(",")})`,[personid]
                )
                for (const movie of directedID) {
                    const directedInsert = `INSERT INTO movie_directors(movie_id,people_id)
                                            VALUES($1,$2)
                                            ON CONFLICT(movie_id,people_id) DO NOTHING`;
                    await pool.query(directedInsert, [movie, personid]);

                }


            }         

            
            
            return personid;
    }
    return;
                 

    
}

async function updateGenreInDB(genrename,genreid,movieID) {
    if (genrename){

            const personUpdate=`UPDATE genres 
                        SET name=$1 
                        WHERE id=$2
                        RETURNING id`;            
            const {rows}=await pool.query(personUpdate,[genrename,genreid]);
            console.log(movieID);
            console.log(genreid);
            if(movieID){
                await pool.query(
                    `DELETE FROM movie_genres
                    WHERE genre_id=$1 AND movie_id NOT IN (${movieID.join(",")})`,[genreid]
                )
                for (const movie of movieID) {
                    const movieInsert = `INSERT INTO movie_genres(movie_id,genre_id)
                                            VALUES($1,$2)
                                            ON CONFLICT(movie_id,genre_id) DO NOTHING`;
                    await pool.query(movieInsert, [movie, genreid]);

                }


            } 
            
            
            return genreid;
    }
    return;
                 

    
}

module.exports={fetchAllMovies,fetchMovieByIdentity,fetchGenreMovies,fetchActorMovies,
    deleteMovieByIdentity,deleteGenreByIdentity,deleteActorByIdentity,
    fetchAllGenres,fetchAllPeople,
    createMovieInDB,createGenreInDB,createPersonInDB,
    updateMovieInDB,updatePersonInDB,updateGenreInDB,
    fetchAllGenresDB
};