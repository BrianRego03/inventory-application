const {Router}=require("express");

actorRouter= Router();

const {fetchActor,deleteActorById,createActor,updateActor} = require("../controllers/actorController");

actorRouter.get("/delete",deleteActorById);

actorRouter.get("/:actorID",fetchActor);
actorRouter.post("/create",createActor);
actorRouter.post("/update",updateActor);


module.exports=actorRouter;