const {Router}=require("express");

genreRouter= Router();

const {fetchGenre,deleteGenreById,createGenre} = require("../controllers/genreController");

genreRouter.get("/:genreID",fetchGenre);
genreRouter.get("/:genreID/delete",deleteGenreById);
genreRouter.post("/create",createGenre);


module.exports=genreRouter;