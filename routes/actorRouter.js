const {Router}=require("express");

actorRouter= Router();

const {fetchActor,deleteActorById,createActor,
    updateActor,fetchAllPeople} = require("../controllers/actorController");

actorRouter.get("/",fetchAllPeople);
actorRouter.get("/delete",deleteActorById);
actorRouter.get("/:actorID",fetchActor);
actorRouter.post("/create",createActor);
actorRouter.post("/update",updateActor);


module.exports=actorRouter;