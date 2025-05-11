const {Router}=require("express");

genreRouter= Router();

const {fetchGenre,deleteGenreById,
    createGenre,updateGenre,fetchAllGenres} = require("../controllers/genreController");

genreRouter.get("/",fetchAllGenres);    
genreRouter.get("/delete",deleteGenreById);
genreRouter.get("/:genreID",fetchGenre);
genreRouter.post("/create",createGenre);
genreRouter.post("/update",updateGenre);


module.exports=genreRouter;