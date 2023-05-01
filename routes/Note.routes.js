const express=require('express');
const {NoteModel}=require('../model/Notee.model');
const noteRouter=express.Router()

noteRouter.get('/', async(req,res)=>{
    try {
        const notes = await NoteModel.find({authorId:req.body.authorId})
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
noteRouter.post("/create",async (req,res)=>{
 try {
    const note= new NoteModel(req.body)
    await note.save()
    res.status(200).send({"message":"Note created successfully"})
 } catch (error) {
    res.status(400).send({"message":error.message})
 }
});

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note= await NoteModel.findOne({_id:noteID})
try {
   if (authorId!=note.authorId) {
    res.status(200).send({"message":"You are not authorized to do this action"})
   } else {
    await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
   res.status(200).send({"message":"Note updated successfully"})
   }
} catch (error) {
    res.status(200).send({"message":"You are not authorized to do this action"})
}
});

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note= await NoteModel.findOne({_id:noteID})
try {
    if (authorId!=note.authorId) {
        res.status(200).send({"message":"You are not authorized to do this action"})
    } else {
    await NoteModel.findByIdAndDelete({_id:noteID})
    res.status(200).send({"message":"Note deleted successfully"})
    }
} catch (error) {
        res.status(200).send({"message":"You are not authorized to do this action"})
     
}
});

module.exports={noteRouter};