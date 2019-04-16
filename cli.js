var net = require('net');
var ProtocallForm = {
             "functionName" : "",
             "value" : "",
             "args":[""],
             "time": ""
};
var client = net.connect({port: 3333, host:'localhost'},function(){
//net모듈의 소켓 객체를 사용
    console.log('Client connected');
    
    var temp = ProtocallForm;
    temp.functionName = "queryAllChannels";
    temp.args = [1, 11];
    client.write(JSON.stringify(temp));
});

client.on('data',function(data){//data 이벤트 발생시 callback
    console.log(data.toString());
    client.end();
});

client.on('end',function(){//end 이벤트 발생시 callback
    console.log('Client disconnected');
});


