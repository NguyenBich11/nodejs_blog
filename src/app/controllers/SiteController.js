const Course = require('../models/Course')

class SiteController {

    // GET / 
    async index(req, res, next) {
        Course.find({})
            .lean()        
            .then(courses => res.render('home', {
                courses
            }))
            .catch(next)
        
    }

    // [Get] /search
    search(req, res) { 
        res.render('search');
    }
}

module.exports = new SiteController;