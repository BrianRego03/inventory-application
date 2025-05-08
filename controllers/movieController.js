const {fetchMovieByIdentity}=require("../db/queries");

const fetchMovieById=async(req,res)=>{
    const {movieID}=req.params;
    const movieObj=await fetchMovieByIdentity(movieID);
    console.log(movieObj);
    res.render("moviePage",{movie:movieObj});
}

module.exports={fetchMovieById};