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
                            COALESCE(g.genres,'{}'::JSON[]) AS genres,
                            COALESCE(a.actors,'{}'::JSON[]) AS actors,
                            COALESCE(d.directors,'{}'::TEXT[]) AS directors
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
                                    ARRAY_AGG(JSON_BUILD_OBJECT('aname',p.name,'aid',p.id)
                                    ) AS actors
                            FROM movie_actors ma
                            LEFT JOIN people p ON ma.people_id=p.id
                            GROUP BY movie_id        
                      ) a ON m.id=a.movie_id
                      LEFT JOIN (
                            SELECT md.movie_id,
                                    ARRAY_AGG(p.name) AS directors
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
                            COALESCE(m.genremovies,'{}'::JSON[]) AS genremovies
                       FROM genres g
                       LEFT JOIN(
                            SELECT mg.genre_id,
                                    ARRAY_AGG(
                                        JSON_BUILD_OBJECT('movie_id',m.id,'movie_name',m.name)
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
                            COALESCE(m.actormovies,'{}'::JSON[]) AS actormovies
                       FROM people p
                       LEFT JOIN(
                            SELECT ma.people_id,
                                    ARRAY_AGG(
                                        JSON_BUILD_OBJECT('movie_id',m.id,'movie_name',m.name)
                                    ) AS actormovies
                            FROM movie_actors ma
                            LEFT JOIN movies m ON ma.movie_id=m.id
                            GROUP BY people_id     
                       ) m ON p.id=m.people_id
                        where p.id=$1                       
                       `
    const {rows}=await pool.query(actorQuery,[id]);
    return rows[0];                   
}

module.exports={fetchAllMovies,fetchMovieByIdentity,fetchGenreMovies,fetchActorMovies};