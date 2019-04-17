var net = require('net');
var jsonform = require('./protocall.js');
const query = require('./hyModule/query.js');
const invoke = require('./hyModule/invoke.js');



var server = net.createServer((socket) => {

    console.log("Socket is connected");

    socket.on('data', (data) => {
        
        console.log(data + " is received"); 
        
        var getdata = data.toString().replace(/\n/g, "");  //removeall \n
        var jsondata = JSON.parse(getdata);
        switch (jsondata.functionName) {
          case 'queryAllCompanys':
                console.log('///queryAllCompanys');

                query.queryAllCompanys().then((result) =>{
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
                break;

          case 'donateMoney':
                console.log('///donateMoney');
                id = jsondata.args[0];
                value = jsondata.args[1];
                invoke.donateMoney(id, value).then((result) =>{
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
                break;
          case 'queryAllChannels':
                console.log('///channellist');
                var tt = jsonform.Channelinfo;
                query.queryAllChannels().then((result) =>{
                    tt.channellist = result;
                    console.log(tt);
                }).catch((err) => {
                    console.log(err);
                });
                break;
          case 'queryblockinfo':
                console.log('///queryblockinfo');

                //dataquery = await query;
                //await dataquery.queryblockinfo();

                query.queryblockinfo().then((result) =>{
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
                break;
          case 'createCompany':
                console.log('///createCompany');
                
                id = "4";
                name = "Hanyang";
                money = "33";

                invoke.createCompany(id, name, money).then((result) =>{
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
                break;
            default:
                console.log('///Wrong Function Name is received');
        }
    });

    socket.on('end',() => {
        console.log('socket is disconnected');
    });
});
server.listen(3333, () => {
    console.log('server listening for connections');
});
