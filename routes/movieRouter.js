const {Router}=require("express");

movieRouter= Router();

const {fetchMovieById,deleteMovieById}=require("../controllers/movieController");

movieRouter.get("/:movieID",fetchMovieById);
movieRouter.get("/:movieID/delete",deleteMovieById);

module.exports=movieRouter;