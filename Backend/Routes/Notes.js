const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../MiddleWare/fetchUser')
const Note = require("../Models/Notes")

// Get all notes

router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error')
    }
})

// Add notes

router.post('/addNotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),//Custom msg
    body('description').isLength({ min: 20 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

// Update Notes

router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    try {
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json("Not found")
        }
        if (note.user.toString()!==req.user.id){
            return res.status(401).json("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true});
        res.json(note);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

//Delete Notes

router.delete('/deleteNote/:id',fetchUser,async(req,res)=>{
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json("Not found")
        }
        if (note.user.toString()!==req.user.id){
            return res.status(401).json("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json('Deleted Successfully');
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Internal Server Error');
    }
})

module.exports = router