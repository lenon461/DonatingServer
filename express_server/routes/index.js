var express = require('express');
var router = express.Router();

const query =  require('../hyModule/query.js');
const invoke = require('../hyModule/invoke.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/channels', function(req, res, next) {

    query.queryAllChannels()
        .then((result) => { 
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        }); 
});
router.put('/channels/donate/', function(req, res, next) {
    let channelname = req.body.channelname;
    let id = req.body.id;
    let money = req.body.money;
    invoke.donateMoney(channelname, id, money)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

router.put('/channels/create/', function(req, res, next) {
    let channelname = req.body.channelname;
    let id = req.body.id;
    let name = req.body.name;
    let money = req.body.money;
    
    invoke.createCompany(channelname, id, name, money)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/channels/ledger/', function(req, res, next) {

    let channelname = req.query.channelname;
    query.queryAllCompanys(channelname)
        .then((result) => {
            console.log(result);
            res.json(JSON.parse(JSON.parse(result)));
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/channels/block', function(req, res, next) {
    let channelname = req.query.channelname;
    query.queryblockinfo(channelname)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

module.exports = router;
