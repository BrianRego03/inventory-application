const {Router}=require("express");

actorRouter= Router();

const {fetchActor,deleteActorById,createActor} = require("../controllers/actorController");

actorRouter.get("/:actorID",fetchActor);
actorRouter.get("/:actorID/delete",deleteActorById);
actorRouter.get("/create",createActor);


module.exports=actorRouter;