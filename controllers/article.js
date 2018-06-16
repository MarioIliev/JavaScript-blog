const Article = require('../models').Article;
const User = require('../models').User;

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        //take values from requaest
        const title = req.body.title;
        const content = req.body.content;
        const picture = req.body.picture;

        let errorMsg = false;

        if(!req.isAuthenticated()) {
            errorMsg = 'You must be logged in before creating articles';
        }
        else if(!title){
            errorMsg = 'Title cannot be empty';
        }
        else if(!content){
            errorMsg = 'Content cannot be empty';
        }
        else if(!picture){
           errorMsg = 'Picture cannot be empty';
        }

        if (errorMsg) {
            res.render('article/create', {error:errorMsg, title,content,picture});
            return;
        }
        //find author
        const authorId = req.user.id;

        const article = {
            title,
            content,
            authorId,
            picture
        };
        //validate input

        //record values
        Article.create(article).then(article => {
            res.redirect('/');
        }).catch(e => {
            console.log(e.message);
            res.render('article/create', {error:e.message});
        });

        //redirect to /
    },
    details:(req, res) => {
        // get article ID
        const articleId = Number(req.params.id);
        // get from DB by ID
        Article.findById(articleId, {
            include: [{
                model: User
            }]
        }).then(article => {
            if(article === null){
                throw new Error('Article not found: ' + articleId);
            }
            res.render('article/details', article.dataValues)
        }).catch(e => {
           console.log(e.message);
           res.rendirect('/404');
        });
        // render template with data
    }
};