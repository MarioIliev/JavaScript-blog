const Profile = require('../models').Profile;

    module.exports = {
         profileGet: (req, res) => {
            res.render('profile/profile');
            //направи
        },
         profilePost: (req, res) => {
            const favoriteTeam = req.body.favoriteTeam;
            const profilePicture = req.body.profilePicture;
            const sumary = req.body.sumary;

            let errorMsg = false;

            if(!req.isAuthenticated()) {
                errorMsg = 'You must be logged in before change your profile data';
            }
            else if(!favoriteTeam){
                errorMsg = 'Favorite team cannot be empty';
            }
            else if(!sumary){
                errorMsg = 'Sumary cannot be empty';
            }
            else if(!profilePicture){
                errorMsg = 'Picture cannot be empty';
            }

            if (errorMsg) {
                res.render('profile/profileChange', {error:errorMsg, favoriteTeam,sumary,profilePicture});
                return;
            }
            //const authorId = req.user.id;

            const profile = {
                profilePicture,
                favoriteTeam,
                sumary
            };

             Profile.create(profile).then(profile => {
                 res.redirect('profile/profile');
             }).catch(e => {
                 console.log(e.message);
                res.render('profile/profileChange', {error:e.message});
             });

           // Profile.change(profile).then(profile => {
           //     res.redirect('/profile/profileChane');
           // });
        },
        profileChangeGet:(req,res) =>{
             res.render('profile/profileChange');
        }
    };

