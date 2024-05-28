const Course = require('../models/Course')

class UserController {
    // [Get] user/stored/courses
    storedCourses(req, res, next) { 
        Course.find({})
            .lean()
            .then((courses) => {
                res.render('user/stored-courses', { courses })
            })
            .catch(next)
    }
}

module.exports = new UserController;