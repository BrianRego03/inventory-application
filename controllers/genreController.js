const {fetchGenreMovies} = require("../db/queries");

const fetchGenre=async(req,res)=>{
    const {genreID}=req.params;
    const movies=await fetchGenreMovies(genreID);
    console.log(movies);
    res.render("genrePage",{movies:movies});
}

module.exports={fetchGenre};