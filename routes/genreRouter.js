const {Router}=require("express");

genreRouter= Router();

const {fetchGenre} = require("../controllers/genreController");

genreRouter.get("/:genreID",fetchGenre);

module.exports=genreRouter;