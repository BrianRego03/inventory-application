const {Router}=require("express");

movieRouter= Router();

const {fetchMovieById}=require("../controllers/movieController");

movieRouter.get("/:movieID",fetchMovieById);

module.exports=movieRouter;