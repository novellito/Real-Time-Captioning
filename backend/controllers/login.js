const jwt = require('jsonwebtoken');
const ldap = require('ldapjs');
const studentsController = require("./students");
const captionerController = require("./captionists");
const adminsController = require("./admins");

let LoginController = {};

LoginController.authenticate = (req,res) => {

    let client = ldap.createClient({
        url: 'ldaps://meta-dap-prod.metalab.csun.edu:636'
    });

    console.log("trying to bind");

    if(req.body.username === 'super') { // Super login credential (for testing)
        const userData = {
            fname: 'super',
            lname: 'user',
            userID: 'user123',
            email: 'entry.mail@test.com',
            role: 'student', // can be changed to captioner
          }

          studentsController.getStudentByUsername({params:{username:'user123',name:'super user',method:'login'}}, null, function(){
                const token = jwt.sign(userData, 'secret', {expiresIn:604800}) // 'secret will be env later on', expires in 1 week
                res.json({success:true, token: token,userData});
          });

        // KEEPING THIS FOR TESTING   
        // if you want super user to be captioner  
        //   captionerController.getCaptionerByUsername({params:{username:'super',name:'super user',method:'login'}}, nulll, function() {
        //         const token = jwt.sign(userData, 'secret', {expiresIn:604800}) // 'secret will be env later on', expires in 1 week
        //         res.json({success:true, token: token,userData});
        //   });
  
    } else {

    client.bind(`uid=${req.body.username},dc=METALABProxy,cn=Pioneering,ou=Proxies,ou=Auth,o=csun`, `${req.body.password}`, function (err, response) {
        
        console.log("binding successful");

        if (err) {
          console.log(err);
          res.send({msg:"invalid credentials"});
          
        } else {
    
          var opts = {
            filter: `(uid=${req.body.username})`,
            scope: 'sub'
          };
    
          client.search('o=csun', opts, function (err, ldapRes) {

            ldapRes.on('searchEntry', function (entry) {

                entry = JSON.parse(JSON.stringify(entry.object));

                const fullName = entry.givenName + ' ' + entry.sn;
                // similar process for checking if logged user is admin
     
               captionerController.getCaptionerByUsername({params:{username:entry.uid,name:fullName,method:'login'}}, null, function(role) {
                    console.log('in call back 2 ')
                    if (role === 'captioner') {
                        const userData = {
                            fname: entry.givenName,
                            lname: entry.sn,
                            userID: entry.uid,
                            email: entry.mail,
                            role: 'captioner'
                          }
                  
                          const token = jwt.sign(userData, 'secret', {expiresIn:604800}) // 'secret will be env later on', expires in 1 week
                          res.json({success:true, token: token,userData});
                    } else { // user must be a student
                        studentsController.getStudentByUsername({params:{username:entry.uid,name:fullName,method:'login'}}, null, function(role) {
                            const userData = {
                                fname: entry.givenName,
                                lname: entry.sn,
                                userID: entry.uid,
                                email: entry.mail,
                                role: 'student'
                              }
                      
                              const token = jwt.sign(userData, 'secret', {expiresIn:604800}) // 'secret will be env later on', expires in 1 week
                              res.json({success:true, token: token,userData});
                        });
                    }});

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