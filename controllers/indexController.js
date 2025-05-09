const { fetchAllMovies, fetchAllPeople, fetchAllGenres } = require("../db/queries");

const fetchIndexMovies=async(req,res)=>{
    const [movies,people,genres]=await Promise.all(
        [
            fetchAllMovies(),
            fetchAllPeople(),
            fetchAllGenres()
        ]
    );

    res.render("index",{movies:movies,people:people,genres:genres});
}

module.exports={fetchIndexMovies};