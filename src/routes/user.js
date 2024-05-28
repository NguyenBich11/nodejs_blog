var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/stored/courses', userController.storedCourses);

module.exports = router;