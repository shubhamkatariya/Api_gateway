var API = require('../models/api.model.js');

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body.content) {
        res.status(400).send({message: "Note can not be empty"});
    }
    var note = new Note({title: req.body.title || "Untitled Note", content: req.body.content});

    note.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });

};

exports.findAll = function(req, res) {
    // Retrieve and return all apis from the database.

};

exports.findOne = function(req, res) {
    // Find a single api with a apiId

};

exports.update = function(req, res) {
    // Update a api identified by the apiId in the request

};

exports.delete = function(req, res) {
    // Delete a api with the specified apiId in the request

};