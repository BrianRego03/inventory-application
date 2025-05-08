const {Router}=require("express");

actorRouter= Router();

const {fetchActor} = require("../controllers/actorController");

actorRouter.get("/:actorID",fetchActor);

module.exports=actorRouter;