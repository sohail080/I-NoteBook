const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Route 1: get all the notes using GET:"/api/notes/fetchallnotes", login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }

})

//Route 2: add a new note using POST:"/api/notes/addnote", login required
router.post('/addnote', fetchuser, [
    body('title', 'title must be 4 characters').isLength({ min: 4 }),
    body('description', 'description must be 10 characters').isLength({ min: 10 }),

], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes(
            {
                title, description, tag, user: req.user.id
            })
        const savedNote = await note.save();
        res.json(savedNote);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }

})
//Route 3: update a note using PUT:"/api/notes/updatenote", login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote object
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("ACCESS DENIED");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})

//Route 4: delete an exsiting note using DELETE:"/api/notes/deletenote", login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        //Allows deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("ACCESS DENIED");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "note has been deleted!", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})
module.exports = router; 