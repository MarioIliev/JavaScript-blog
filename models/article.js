const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Article = sequelize.define('Article',{
        title: {
            type:Sequelize.STRING,
            reequired: true,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            required: true,
            allowNull: false
        },
        picture: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            required: true,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: false
    });
    
    Article.associate = function (models) {
        Article.belongsTo(models.User, {
            foreingKey: 'authorId',
            targetKey: 'id'
        });
    };

    return Article;
};