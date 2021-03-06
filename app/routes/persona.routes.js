module.exports = app => {
  const cust_persona = require("../controllers/dcp.controllers.js");

  var router = require("express").Router();
  router.get("/persona", cust_persona.listall);
  router.get("/persona1/:client_id", cust_persona.listbyid);
  router.get("/persona2/:first", cust_persona.listbyfirst);
  router.get("/persona3/:last", cust_persona.listbylast);
  router.get("/persona4/:email", cust_persona.listbyemail);
  router.get("/ids/",cust_persona.listcid);
  router.get("/ids1/",cust_persona.listcid1);
  router.get("/ids/:client_id",cust_persona.cid);
  router.get("/top5/:CLIENT_ID/:FromDate/:ToDate",cust_persona.categorytop5); 
  router.get("/top10/:CLIENT_ID",cust_persona.categorytop10);
  router.get("/getmapdetails",cust_persona.getmapdetails); 
  router.get("/top5date/:CLIENT_ID",cust_persona.categorytop5withdate);
  router.get("/map/:CLIENT_ID/:FromDate/:ToDate",cust_persona.mapplot); 
  router.get("/child/:CLIENT_ID/:FromDate/:ToDate",cust_persona.childnodes); 

 /* router.get("/published", tutorials.findAllPublished);

  router.get("/:id", tutorials.findOne);

  router.put("/:id", tutorials.update);

  router.delete("/:id", tutorials.delete);

  router.delete("/", tutorials.deleteAll);*/

  app.use('/api/dcp', router);
};