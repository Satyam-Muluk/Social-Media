module.exports.profile = function(req,res){

    return res.render('user_profile',{
        title:'profile'
    })
    return res.end('<h1>User profile</h1>');
}
module.exports.posts = function(req,res){
    return res.end('<h1> Posts page </h1>')
}