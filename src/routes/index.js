const newsRouter = require('./news.route')
const siteRouter = require('./site.route')


function route(app) {
    app.get('/', (req, res) => {
        res.render('home')
    });

    app.use('/news',newsRouter);
    app.use('/',siteRouter);
    
}

module.exports = route;