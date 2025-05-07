const pool=require("./pool");

async function fetchAllMovies() {
    const {rows}=await pool.query("SELECT * FROM movies");
    console.log(rows);
    
}

module.exports={fetchAllMovies};