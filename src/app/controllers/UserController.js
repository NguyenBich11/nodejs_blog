const Course = require('../models/Course')

class UserController {
    // [Get] user/stored/courses
    storedCourses(req, res, next) { 
        Promise.all( [Course.find({}).lean(), Course.countDocumentsWithDeleted({ deleted: true})])
            .then(([courses, deletedCount]) => {
                res.render('user/stored-courses', { 
                    deletedCount,
                    courses 
                });
            })
            .catch(next);
    }

    // [Get] user/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true})
        .lean()
        .then((courses) => {
            res.render('user/trash-courses', { courses })
        })
        .catch(next)
    }
}

module.exports = new UserController;