const {fetchMovieByIdentity,deleteMovieByIdentity,
    createMovieInDB,fetchAllPeople,fetchAllGenres,updateMovieInDB}=require("../db/queries");

const fetchMovieById=async(req,res)=>{
    const {movieID}=req.params;
    const movieObj=await fetchMovieByIdentity(movieID);
        const [people,genres]=await Promise.all(
        [
            fetchAllPeople(),
            fetchAllGenres()
        ]
    );
    console.log(movieObj);
    res.render("moviePage",{movie:movieObj,people:people,genres:genres});
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

const updateMovie=async(req,res)=>{
    const name= req.body.createMovie;
    const url=req.body.createMovieUrl;
    const year=req.body.createMovieYear;
    const id=req.body.createMovieID;

    const director=req.body.movieDirector;
    const actor=req.body.movieActor;
    const genre=req.body.movieGenre;
    const movieID=await updateMovieInDB(name,url,year,id,director,actor,genre);
    res.redirect(`/movies/${movieID}`);

}
module.exports={fetchMovieById,deleteMovieById,createMovie,updateMovie};