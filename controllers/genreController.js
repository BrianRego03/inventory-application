const {fetchGenreMovies,deleteGenreByIdentity,createGenreInDB,
    fetchAllMovies
} = require("../db/queries");

const fetchGenre=async(req,res)=>{
    const {genreID}=req.params;
 
    const [allMovies,movies]=await Promise.all(
        [
            fetchAllMovies(),
            fetchGenreMovies(genreID)
        ]
    );
    console.log(movies);
    res.render("genrePage",{movies:movies,allMovies:allMovies});
}

const deleteGenreById=async(req,res)=>{
    const {genreID}=req.params;
    await deleteGenreByIdentity(genreID);
    res.redirect("/");
}

const createGenre=async(req,res)=>{
    console.log(req.body);
    const name= req.body.createGenre;
    const movie=req.body.genreMovie;
    const genreID=await createGenreInDB(name,movie);
    res.redirect(`/genres/${genreID}`);

}

module.exports={fetchGenre,deleteGenreById,createGenre};