let LoginController = {};

LoginController.authenticate = (req,res) => {

    const usr = "test";
    const pw = "test";
    if(usr !== req.body.username || pw !== req.body.password) {
        res.send({msg:"invalid credentials"});
    } else {
        res.send({msg:"success"});
    }
    console.log(req.body.username);
    console.log(req.body.password);
    // res.end();

}

module.exports = LoginController;