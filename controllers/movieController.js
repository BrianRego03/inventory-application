const {fetchMovieByIdentity,deleteMovieByIdentity,createMovieInDB}=require("../db/queries");

const fetchMovieById=async(req,res)=>{
    const {movieID}=req.params;
    const movieObj=await fetchMovieByIdentity(movieID);
    console.log(movieObj);
    res.render("moviePage",{movie:movieObj});
}

const deleteMovieById=async(req,res)=>{
    const {movieID}=req.params;
    await deleteMovieByIdentity(movieID);
    res.redirect("/");
}

const createMovie=async(req,res)=>{
    console.log(req.body);
    const name= req.body.createMovie;
    const url=req.body.createMovieUrl;
    const year=req.body.createMovieYear;
    const director=req.body.movieDirector;
    const actor=req.body.movieActor;
    const genre=req.body.movieGenre;
    const movieID=await createMovieInDB(name,url,year,director,actor,genre);
    res.redirect(`/movies/${movieID}`);

}
module.exports={fetchMovieById,deleteMovieById,createMovie};