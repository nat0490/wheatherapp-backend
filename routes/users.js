var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


//INSCRIRE UN USER DANS LA COLLECTION USERS
router.post('/signup', (req,res) => {
if (checkBody(req.body, ["name", "email", "password"])) {
    User.findOne({ email: req.body.email }).then(dbData => {   
        if (dbData) {
            res.json({result: false, error: 'User already exists' })
        return;
        } else {
            res.json({result:true});
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
         })
        newUser.save(); 
        }
    })} else {
        res.json({result: false, error: 'Missing or empty fields'})
        return;
    };
});


//VERIFIER LA CONNEXION D'UN USER
router.post('/signin', (req,res) => {
    if (checkBody(req.body, ["email", "password"])) {
        User.findOne({ email: req.body.email, password: req.body.password }).then(dbData => {
            if (dbData) {
                res.json({ result: true })
            } else {
                res.json({ result: false, error: 'User not found' });
            }
        })
    } else {
        res.json({result: false, error: 'Missing or empty fields'});
        return;
    }
});



module.exports = router;
