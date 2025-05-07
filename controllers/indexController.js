const { fetchAllMovies } = require("../db/queries");

const fetchIndexMovies=async(req,res)=>{
    await fetchAllMovies();
    res.render("index");
}

module.exports={fetchIndexMovies};