const express = require('express');
const passport = require('passport');


const router = express.Router();



const usersController = require('../controller/users_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/posts',usersController.posts);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
    
),usersController.createSession)



router.get('/sign-out',usersController.destroySession);
module.exports = router;