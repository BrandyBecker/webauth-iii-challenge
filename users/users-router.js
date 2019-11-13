const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkDeparment(['one','two']), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

function checkDeparment(department){
  return function(req,res,next){
    if(department.includes(req.decodedJwt.department)){
      next();
    }else{
      res.status(403).json({message: "Can't touch this!"})
    }
  }
}
