const {Router}=require("express");

actorRouter= Router();

const {fetchActor,deleteActorById,createActor,updateActor} = require("../controllers/actorController");

actorRouter.get("/:actorID",fetchActor);
actorRouter.get("/:actorID/delete",deleteActorById);
actorRouter.post("/create",createActor);
actorRouter.post("/update",updateActor);


module.exports=actorRouter;