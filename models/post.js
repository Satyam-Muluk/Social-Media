// one user can have multiple post, therefore 1:M relation

const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }
},{
    timestamps:true
});

const Post =mongoose.model('Post',postSchema);
module.exports = Post;