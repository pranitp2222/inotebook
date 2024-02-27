const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async(req, res) => {
    const notes = await Notes.find({user : req.user});
    if(!notes){
        res.status(500).json({Error})
    }
    res.json(notes)
})

router.post('/addnotes', fetchuser, [
    body('title','Enter Correct title').isLength({min:3}),
    body('description','Enter Description With Minimum of 3 Words').isLength({min:5}),
], async(req, res) => {
    try {
    const {title, description, tag} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const note = new Notes({
        title, description, tag, user : req.user
    })

    const savedNote = await note.save()
    res.json(savedNote)
} catch (error) {
    console.log(error.message)
    return res.status(400).send("Internal Server Errors"); 
}
})

router.put('/updatenote/:id', fetchuser, async(req, res) => {
    const {title, description, tag} = req.body;
    const newNote = {}
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};

    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Not Found")}

    if(note.user.toString() !== req.user){
        return res.status(400).send("Not Allowed")
    }

    note  = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true}) 
    res.json(note)
})

router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    const {title, description, tag} = req.body;
    const newNote = {}
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(400).send("Not Found")}

    if(note.user.toString() !== req.user){
        return res.status(400).send("Not Allowed")
    }

    note  = await Notes.findByIdAndDelete(req.params.id) 
    res.json({"Success" : "Note has been deleted", note : note});
})

module.exports = router