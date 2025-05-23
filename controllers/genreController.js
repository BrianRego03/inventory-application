const {fetchGenreMovies,deleteGenreByIdentity,createGenreInDB,
    fetchAllMovies,updateGenreInDB,fetchAllGenresDB
} = require("../db/queries");

const fetchAllGenres=async(req,res)=>{
    const [genres,movies]=await Promise.all(
        [
            fetchAllGenresDB(),
            fetchAllMovies()
        ]

    )

       
    res.render("genreIndex",{genres:genres,movies:movies});
}

const fetchGenre=async(req,res)=>{
    const {genreID}=req.params;
 
    const [allMovies,movies]=await Promise.all(
        [
            fetchAllMovies(),
            fetchGenreMovies(genreID)
        ]
    );
    console.log(movies);
    res.render("genrePage",{movies:movies,allMovies:allMovies});
}

const deleteGenreById=async(req,res)=>{
    const genreID=+(req.query.id);
    const moviePass=req.query.pass;
    if(moviePass!=="shazam"){
        return res.redirect("/");

    }
    await deleteGenreByIdentity(genreID);
    res.redirect("/");
}

const createGenre=async(req,res)=>{
    console.log(req.body);
    const name= req.body.createGenre;
    const movie=req.body.genreMovie;
    const genreID=await createGenreInDB(name,movie);
    res.redirect(`/genres/${genreID}`);

}

const updateGenre=async(req,res)=>{
    if(req.body.createGenrePass!=="shazam"){
        return res.redirect(`/genres/${req.body.createGenreID}`);
    }
    console.log(req.body);
    const name= req.body.createGenre;
    const movie=req.body.genreMovie;
    const id=req.body.createGenreID;

    const genreID=await updateGenreInDB(name,id,movie);
    res.redirect(`/genres/${genreID}`);

}




module.exports={fetchGenre,deleteGenreById,createGenre,updateGenre,fetchAllGenres};