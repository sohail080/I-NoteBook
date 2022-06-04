const mongoose = require('mongoose');
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default:'General'
    },
    date:{
        type:date,
        default: Date.now
    },
});
module.exports=mongoose.model('notes',NotesSchema);