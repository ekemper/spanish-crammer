var Definition = require('../models/definition');
var User = require('../models/user'); 
var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = express();

var definitionsRoutes = express.Router();
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/definitions"
 *    GET: finds all definitions
 *    POST: creates a new definition
 */

definitionsRoutes.get("/", function(req, res) {

  console.log('received get request on /definitons');

  Definition.find(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get definitions.");
    } else {
      res.status(200).json(docs);
    }
  });
});

definitionsRoutes.post("/", function(req, res) {

  var newDefinition = new Definition(req.body);

  newDefinition.createDate = new Date();

  if (!req.body) {
    handleError(res, "Invalid definition", 400);
  }

  newDefinition.save(function(err) {
    if (err) throw err;

    console.log('definition saved successfully');
    res.json({ 
      success: true,
      newDefinition: newDefinition 
    });
  });
});

/*  "/api/definitions/:id"
 *    GET: find definition by id
 *    PUT: update definition by id
 *    DELETE: deletes definition by id
 */

definitionsRoutes.get("/:id", function(req, res) {
  Definition.findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get definition");
    } else {
      res.status(200).json(doc);
    }
  });
});

definitionsRoutes.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  Definition.updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update definition");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

definitionsRoutes.delete("/:id", function(req, res) {
  Definition.deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete definition");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


module.exports = definitionsRoutes;