const {fetchActorMovies,deleteActorByIdentity,createPersonInDB} = require("../db/queries");

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
const createActor=async(req,res)=>{
    const name= req.body.createPerson;
    const url=req.body.createPersonUrl;
    const acted=req.body.actorMovie;
    const directed=req.body.directorMovie;
    const actorID=await createPersonInDB(name,url,directed,acted);
    res.redirect(`/actors/${actorID}`);
}

module.exports={fetchActor,deleteActorById,createActor};