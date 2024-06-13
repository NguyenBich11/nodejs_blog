const Course = require('../models/Course')

class CourseController {

    // [Get] /course/:slug
    show(req, res, next) { 

        Course.findOne( { slug: req.params.slug})
            .lean()
            .then((course) => {
                res.render('courses/show', { course});
            })
            .catch(next);
    }

    // [Get] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [Post] /course/store
    async store(req, res, next) {
        try {
            const formData = req.body;
            formData.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
            const course = new Course(formData);
            await course.save()
                .then(() => res.redirect('/user/stored/courses'))
        }
        catch(err){
            next(err);
        }
    }

     // [Get] /course/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).lean();
            res.render('courses/edit', { course });
        } catch (err) {
            next(err);
        }
    }

    // [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/user/stored/courses'))
            .catch(next)
    }

    // [DELETE] /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    // [POST] /course/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIDs } })
                .then(() => res.redirect('back'))
                .catch(next);
                break;
            case 'forceDelete':
                Course.deleteOne({ _id: {$in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: {$in: req.body.courseIDs } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!'});
        }
    }

}

module.exports = new CourseController;