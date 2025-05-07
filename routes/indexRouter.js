const {Router}=require("express");

indexRouter= Router();

const {fetchIndexMovies}=require("../controllers/indexController");

indexRouter.get("/",fetchIndexMovies);