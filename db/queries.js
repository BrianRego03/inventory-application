const pool=require("./pool");

async function fetchAllMovies() {
    const {rows}=await pool.query("SELECT * FROM movies");
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
                const movieCreateDirector=`INSERT INTO movie_directors(movie_id,people_id)
                                            VALUES($1,$2)`;
                await pool.query(movieCreateDirector,[movieid,directorID]);                           
            }
            if(actorID){
                const movieCreateActor=`INSERT INTO movie_actors(movie_id,people_id)
                                            VALUES($1,$2)`;
                await pool.query(movieCreateActor,[movieid,actorID]);                           
            }
            if(genreID){
                const movieCreateGenres=`INSERT INTO movie_genres(movie_id,genre_id)
                                            VALUES($1,$2)`;
                await pool.query(movieCreateGenres,[movieid,genreID]);                           
            }
            
            return movieid;
    }
    return;
                 

    
}

module.exports={fetchAllMovies,fetchMovieByIdentity,fetchGenreMovies,fetchActorMovies,
    deleteMovieByIdentity,deleteGenreByIdentity,deleteActorByIdentity,
    fetchAllGenres,fetchAllPeople,
    createMovieInDB
};