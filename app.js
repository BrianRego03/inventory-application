const express=require("express");
const app=express();
const path=require("node:path");

const indexRouter=require("./routes/indexRouter");
const movieRouter=require("./routes/movieRouter");
const genreRouter=require("./routes/genreRouter");
const actorRouter=require("./routes/actorRouter");

const assetsPath=path.join(__dirname,"public");
app.use(express.static(assetsPath));


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use("/",indexRouter);
app.use("/movies",movieRouter);
app.use("/genres",genreRouter);
app.use("/actors",actorRouter)



const PORT=3000;
app.listen(PORT,()=>{
    console.log("we good");
})