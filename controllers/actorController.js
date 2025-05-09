const {fetchActorMovies,deleteActorByIdentity} = require("../db/queries");

const fetchActor=async(req,res)=>{
    const {actorID}=req.params;
    const movies=await fetchActorMovies(actorID);
    console.log(movies);
    res.render("actorPage",{movies:movies});
}

const deleteActorById=async(req,res)=>{
    const {actorID}=req.params;
    await deleteActorByIdentity(actorID);
    res.redirect("/");
}

module.exports={fetchActor,deleteActorById};