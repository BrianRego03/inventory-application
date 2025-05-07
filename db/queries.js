const pool=require("./pool");

async function fetchAllMovies() {
    const {rows}=await pool.query("SELECT * FROM movies");
    console.log(rows);
    return rows;
}

async function fetchMovieByIdentity(id) {
    const {rows}=await pool.query("SELECT * FROM movies WHERE movies.id=$1",[id])
    return rows;
}

module.exports={fetchAllMovies,fetchMovieByIdentity};