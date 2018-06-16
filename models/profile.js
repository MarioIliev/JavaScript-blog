const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Profile = sequelize.define('Profile', {

            profilePicture: {
                type: Sequelize.STRING,
                required: true,
                allowNull: false
            },
            favoriteTeam: {
                type: Sequelize.STRING,
                required: true,
                allowNull: false
            },
            sumary: {
                type: Sequelize.TEXT,
                required: true,
                allowNull: false
            }
    }, {
        timestamps: false
    }
);

    ////.associate = function (models) {
    //    Profile.belongsTo(models.User, {
    //        foreingKey: 'profileID',
    //        targetKey:'userID'
    //    });
    //};

    return Profile;
};