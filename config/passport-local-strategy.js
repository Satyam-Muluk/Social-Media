const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
     async function(email, password, done){
        // find a user and establish the identity

        const user = await User.findOne({email});
        if(!user) return done(null,false);

        if(user.password !=password) return done(null,false);

        return done(null,user);



   

        // ----------------------------------------------









        // User.findOne({email: email}, function(err, user)  {
        //     if (err){
        //         console.log('Error in finding user --> Passport');
        //         return done(err);
        //     }

        //     if (!user || user.password != password){
        //         console.log('Invalid Username/Password');
        //         return done(null, false);
        //     }

        //     return done(null, user);
        // });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user);
});



// deserializing the user from the key in the cookies
passport.deserializeUser( async function(user, done)
{
   
    done(null, user);

    // User.findById(id, function(err, user){
    //     if(err){
    //         console.log('Error in finding user --> Passport');
    //         return done(err);
    //     }

    //     return done(null, user);
    // });
});



// check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
   
//    if user is signed in , then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains info of user , we transfer req.user to res.locals
        // req.user containse the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;