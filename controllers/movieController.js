const {fetchMovieByIdentity,deleteMovieByIdentity}=require("../db/queries");

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

module.exports={fetchMovieById,deleteMovieById};