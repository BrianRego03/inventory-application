const {Router}=require("express");

movieRouter= Router();

const {fetchMovieById,deleteMovieById,createMovie,updateMovie}=require("../controllers/movieController");

movieRouter.get("/delete",deleteMovieById);
movieRouter.get("/:movieID",fetchMovieById);
movieRouter.post("/create",createMovie);
movieRouter.post("/update",updateMovie);


module.exports=movieRouter;