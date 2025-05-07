const express=require("express");
const app=express();
const path=require("node:path");
const indexRouter=require("./routes/indexRouter");
const movieRouter=require("./routes/movieRouter");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use("/",indexRouter);
app.use("/movies",movieRouter);


const PORT=3000;
app.listen(PORT,()=>{
    console.log("we good");
})