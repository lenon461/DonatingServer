var net = require('net');
const query = require('./query.js');
const invoke = require('./invoke.js');

var datamodify = function(data){
    var len = data.length;
    var jsonlist = new Array();
    for(var i = 0; i < len; i++){
        var obj = new Object();
        obj.companyname = data[i].Record.companyname;
        obj.money = data[i].Record.money;
        jsonlist.push(obj);
    }
    return JSON.stringify(jsonlist);
};

var server = net.createServer(function(socket){
    console.log('socket connected');
    socket.on('data', function(data){

        getdata = data.toString();
        getdata = getdata.replace(/\n/g, "");//행바꿈제거
        console.log(getdata);
        if(getdata == "queryAllCompanys" || getdata == '2'){

            query.then(function(result){

                objresult = JSON.parse(JSON.parse(result));
                responsedata = datamodify(objresult);

                var offset = 0;
                var buf2 = Buffer.alloc(256);
                while(offset < objresult.length){ 
                    buf2 = Buffer.from(responsedata.substring(offset, offset+255));
                    //console.log(buf2);
                    socket.write(buf2+"\n");
                    offset += 255
                }
                    buf2 = Buffer.from(responsedata.substring(offset,responsedata.length));
                    //console.log(buf2);
                    socket.write(buf2+"\n");
                    console.log(result);
                    console.log("sokect write is end!");
            }).catch(function (err){
                console.log('then error : ', err);
            });
        }

        else if(getdata.substring(1,12) == "donateMoney"){
            invoke.invoke(getdata.substring(0,1), getdata.substring(12,getdata.length));
            console.log("donate is success!");
        }
        else{
            console.log("wrong command is typed!");
        }







    });
    socket.on('end',function(){
        console.log('socket disconnected');
    }
    );
});
server.listen(3333, function(){
    console.log('Server listening for connections');
});


