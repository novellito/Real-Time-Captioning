const jwt = require('jsonwebtoken');

let LoginController = {};

LoginController.authenticate = (req,res) => {

    const user = {
        username: req.body.username
    };

    const token = jwt.sign(user, 'secret', {expiresIn:604800}) // 'secret will be env later on', expires in 1 week


    const usr = "test";
    const pw = "test";
    if(usr !== req.body.username || pw !== req.body.password) {
        res.send({msg:"invalid credentials"});
    } else {
        // res.send({msg:"success"});ks
        res.json({success:true, token: token,user:{username: user.username}});
        
    }
    console.log(req.body.username);
    console.log(req.body.password);
    // res.end();

}

// LoginController.getProfile = (req,res) => {
//     router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//         res.json({user: req.user});
//       });
// }

module.exports = LoginController;