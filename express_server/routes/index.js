var express = require('express');
var router = express.Router();

const query =  require('../hyModule/query.js');
const invoke = require('../hyModule/invoke.js');

router.post('/c', function(req, res, next){
    console.log("post method get");
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/channels', function(req, res, next) {

    console.log(req.query);

    query.queryAllChannels()
        .then((result) => { 
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        }); 
});

router.get('/channels/:channelname', function(req, res, next) {

    let channelname = req.params.channelname;
    
    query.queryAllCompanys(channelname)
        .then((result) => {
            console.log(result);
            res.json(JSON.parse(JSON.parse(result)));
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/channels/:channelname/block', function(req, res, next) {
    let channelname = req.params.channelname;
    query.queryblockinfo(channelname)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

module.exports = router;
