const {fetchActorMovies} = require("../db/queries");

const fetchActor=async(req,res)=>{
    const {actorID}=req.params;
    const movies=await fetchActorMovies(actorID);
    console.log(movies);
    res.render("actorPage",{movies:movies});
}

module.exports={fetchActor};