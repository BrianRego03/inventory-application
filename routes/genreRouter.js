const {Router}=require("express");

genreRouter= Router();

const {fetchGenre,deleteGenreById} = require("../controllers/genreController");

genreRouter.get("/:genreID",fetchGenre);
genreRouter.get("/:genreID/delete",deleteGenreById);


module.exports=genreRouter;