const {Router}=require("express");

movieRouter= Router();

const {fetchMovieById,deleteMovieById,createMovie}=require("../controllers/movieController");

movieRouter.get("/:movieID",fetchMovieById);
movieRouter.get("/:movieID/delete",deleteMovieById);
movieRouter.post("/create",createMovie);

module.exports=movieRouter;