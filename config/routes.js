const userController = require('../controllers').user;
const homeController = require('../controllers').home;
const articleController = require('../controllers').article;
const profileController = require('../controllers').profile;


module.exports = (app) =>{
    app.get('/',homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/login',userController.loginGet);
    app.post('/user/login',userController.loginPost);

    app.get('/user/logout',userController.logout);
  //  app.get('user/details' ,userController.homeIndex);

    app.get('/article/create', articleController.createGet);
    app.post('/article/create', articleController.createPost);
    app.get('/article/details/:id', articleController.details);

    app.get('/profile/profile', profileController.profileGet);
    app.get('/profile/profileChange', profileController.profileChangeGet);
    app.post('/profile/profileChange',profileController.profilePost);
     //app.get('/profile',profileController.profile);

    app.get('*',(req, res) => {
        res.statusCode = 404;
        res.end('<h1>404 Page Not Found</h1>')
    });
};
