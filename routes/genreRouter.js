const {Router}=require("express");

genreRouter= Router();

const {fetchGenre,deleteGenreById,
    createGenre,updateGenre} = require("../controllers/genreController");

genreRouter.get("/delete",deleteGenreById);
genreRouter.get("/:genreID",fetchGenre);
genreRouter.post("/create",createGenre);
genreRouter.post("/update",updateGenre);


module.exports=genreRouter;