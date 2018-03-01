const jwt = require('jsonwebtoken');
const ldap = require('ldapjs');


let LoginController = {};

LoginController.authenticate = (req,res) => {

    
let client = ldap.createClient({
    url: 'ldap://sdir.csun.edu'
  });

    // console.log(req.body);

    // const usr = "test";
    // const pw = "test";
    // if(usr !== req.body.username || pw !== req.body.password) {
    //     res.send({msg:"invalid credentials"});
    // } else {
    //     // res.send({msg:"success"});ks
    //     res.json({success:true, token: token,user:{username: user.username}});
        
    // }
    console.log("trying to bind");
    

    client.bind(`uid=${req.body.username},ou=People,ou=Auth,o=csun`, `${req.body.password}`, function (err, response) {
        
        console.log("binding successful");
        if (err) {
          console.log(err);
          res.send({msg:"invalid credentials"});
          
        } else {
    
          var opts = {
            filter: `(uid=${req.body.username})`,
            scope: 'sub'
            // attributes: ['dn', 'sn', 'cn']
          };
    
          client.search('o=csun', opts, function (err, ldapRes) {

            ldapRes.on('searchEntry', function (entry) {
              // console.log('entry: ' + JSON.stringify(entry.object));
              entry = JSON.parse(JSON.stringify(entry.object));
              const userData = {
                fname: entry.givenName,
                lname: entry.sn,
                userID: entry.uid,
                email: entry.mail
              }

              const user = {
                username: req.body.username
            };
        
            console.log(userData);
            const token = jwt.sign(userData, 'secret', {expiresIn:604800}) // 'secret will be env later on', expires in 1 week
            res.json({success:true, token: token,userData});
            // res.json({success:true, token: token,user:{username: user.username}});
        
              // res.send(JSON.stringify(entry.object));
            //   res.send(entry);
    
            });

            ldapRes.on('error', function(err) {
                console.log(err.message);
                res.send({msg:"User not found!"});
                
            });
    
            ldapRes.on('end', function(result) {
                 client.unbind(function(err) {
                     if(err) {
                         console.log(err);
                     }
                     console.log('unbinding');
                });
            });
    
    
          });
    
        }

      });
    

}

LoginController.verifyToken = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
      next();
    } else {
        res.sendStatus(403) // error
    }
}

LoginController.jwtVerify = (req,res) => {
    jwt.verify(req.token, 'secret', (err, data) => {
        if(err) {
          res.sendStatus(403) // error            
        } else {
            console.log('login successful!');
            res.json({data});
        }
    });
}



module.exports = LoginController;