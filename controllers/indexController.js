const { fetchAllMovies } = require("../db/queries");

const fetchIndexMovies=async(req,res)=>{
    const movies=await fetchAllMovies();
    res.render("index",{movies:movies});
}

module.exports={fetchIndexMovies};