const newsRouter = require('./news');
const userRouter = require('./user');
const siteRouter = require('./site');
const courseTouter = require('./courses');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/user', userRouter);
    app.use('/courses', courseTouter);

    app.use('/', siteRouter);
}

module.exports = route;