const {fetchGenreMovies,deleteGenreByIdentity} = require("../db/queries");

const fetchGenre=async(req,res)=>{
    const {genreID}=req.params;
    const movies=await fetchGenreMovies(genreID);
    console.log(movies);
    res.render("genrePage",{movies:movies});
}

const deleteGenreById=async(req,res)=>{
    const {genreID}=req.params;
    await deleteGenreByIdentity(genreID);
    res.redirect("/");
}

module.exports={fetchGenre,deleteGenreById};