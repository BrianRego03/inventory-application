const {Router}=require("express");

genreRouter= Router();

const {fetchGenre,deleteGenreById,
    createGenre,updateGenre} = require("../controllers/genreController");

genreRouter.get("/:genreID",fetchGenre);
genreRouter.get("/:genreID/delete",deleteGenreById);
genreRouter.post("/create",createGenre);
genreRouter.post("/update",updateGenre);


module.exports=genreRouter;