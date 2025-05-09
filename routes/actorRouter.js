const {Router}=require("express");

actorRouter= Router();

const {fetchActor,deleteActorById} = require("../controllers/actorController");

actorRouter.get("/:actorID",fetchActor);
actorRouter.get("/:actorID/delete",deleteActorById);


module.exports=actorRouter;