
const User = require('../models/user')

module.exports.profile = function(req,res){
  
    // console.log(user.email);
    return res.render('user_profile',{
        title:'profile',
        
        // user:User
    })
    return res.end('<h1>User profile</h1>');
}
module.exports.posts = function(req,res){
    return res.end('<h1> Posts page </h1>')
}


// render the sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:"Codeal | Sign Up"
    });
}

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }

    return res.render('user_sign_in',{
        title:"Codeal | Sign In"
    });
}



// get the sign up data

module.exports.create =  async function(req,res){
    // todo later
   

    // check password and confirm password
   
     
    if(req.body.password !=req.body.confirm_password){
        console.log('Password not match');
        return res.redirect('back');
    }
    try{
       
      const data = await User.findOne({email:req.body.email});

      if(!data){
          await User.create(req.body);
          console.log("user created successfully");
          return res.redirect('/users/sign-in');
      }
      else{
        console.log("user already present");
        return res.redirect('back');
      }


    }catch(err){
      console.log(err);
    }



    


}


// sign in and create a session for user

module.exports.createSession = function(req,res){
    
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

    //this function is given to req by passport js
    req.logout(function(err){
        if(err)
        {
            return next(err);
        }
    });
    return res.redirect('/');
}