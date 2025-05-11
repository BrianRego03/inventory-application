const {fetchActorMovies,deleteActorByIdentity,createPersonInDB,
    fetchAllMovies,updatePersonInDB} = require("../db/queries");

const fetchActor=async(req,res)=>{
    const {actorID}=req.params;
    const [allMovies,movies]=await Promise.all(
        [
            fetchAllMovies(),
            fetchActorMovies(actorID)
        ]
    );
    console.log(movies);
    console.log(allMovies);
    res.render("actorPage",{movies:movies,allMovies:allMovies});
}

const deleteActorById=async(req,res)=>{
   
    const actorID=+(req.query.id);
    const moviePass=req.query.pass;
    if(moviePass!=="shazam"){
        return res.redirect("/");

    }
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

const updateActor=async(req,res)=>{
    if(req.body.createPersonPass!=="shazam"){
        return res.redirect(`/actors/${req.body.createPersonID}`);
    }
    const name= req.body.createPerson;
    const url=req.body.createPersonUrl;
    const id=req.body.createPersonID;

    const acted=req.body.actorMovie;
    const directed=req.body.directorMovie;
    const actorID=await updatePersonInDB(name,url,id,directed,acted);
    res.redirect(`/actors/${actorID}`);
}

module.exports={fetchActor,deleteActorById,createActor,updateActor};