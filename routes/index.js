// entry points to all the routes

const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));

// for any other routes, access from here
// router.use('/routername',require(./routerfile))



module.exports = router;

