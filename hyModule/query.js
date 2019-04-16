/*
 * SPDX-License-Identifier: Apache-2.0
 */

 'use strict';

const CCC = require('fabric-network');
const { FileSystemWallet, Gateway, Transaction } = require('fabric-network');
const { Peer, User } = require('fabric-client');
const Client = require('fabric-client');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..','..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

module.exports = {
    queryAllCompanys :
    
    async function(){
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user2');

            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }  

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'user2', discovery: { enabled: false } });
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract = network.getContract('fabcompany');

            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction('queryAllCompanys');
            // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            // console.log(`test`, result.toString());
            const jsonresult = result.toString();
            //console.log(jsonresult);
            return jsonresult;
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
        }
    },
    
    queryAllChannels :
    
    async function() {
        try {

            /*
            //const peer = new Peer("grpc://localhost:7050",options)
            //console.log(peer); 
            
            const client = Client.loadFromConfig('../../basic-network/connection.yaml');
            const peer = client.getPeer("peer0.org1.example.com");

            const user = new User();
            let cert = fs.readFileSync('/home/hyper/cry/Capstone_TeamLEGO/basic-network/crypto-config/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/
            
            await user.setEnrollment();
            console.log(peer);
            console.log(user);
             * let clientcert = fs.readFileSync('/home/hyper/cry/Capstone_TeamLEGO/basic-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/server.crt');
            let clientkey = fs.readFileSync('/home/hyper/cry/Capstone_TeamLEGO/basic-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/server.key');
            client.setTlsClientCertAndKey(clientcert, clientkey);
            let cert = fs.readFileSync('/home/hyper/cry/Capstone_TeamLEGO/basic-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/admincerts/Admin@org1.example.com-cert.pem');
            let pk = fs.readFileSync('/home/hyper/cry/Capstone_TeamLEGO/basic-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/msp/keystore/46be1d569fe68f33e517c9e0072a0ccfbfb42727480fb8c8d0223af321a7893d_sk');
            const  mspid = 'Org1MSP';
            client.setAdminSigningIdentity(pk, cert, mspid);

            client.setUserContext(user, 0);
            console.log(client);


            const channelqueryresponse = await client.queryChannels(peer,0);

            console.log(channelqueryresponse);


            //console.log(channelqueryresponse);

*/



        } catch (error) {
            console.log("ERRORINTHIS ", error);
            process.exit(1);
        }
    },

    queryblockinfo :
    
    async function(){
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);

            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user2');

            if (!userExists) {
                console.log('An identity for the user "user2" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }  

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: 'user2', discovery: { enabled: false } });
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
            const channel = network.getChannel();
            
            var tempBlockinfo = [];
            var tempBlock_data_transaction_info = [];
            var blockheight = (await channel.queryInfo()).height.low;

            for(var i = 0; i < blockheight; i++){
                try{
                    tempBlockinfo.push((await channel.queryBlock(i)).header);
                    tempBlock_data_transaction_info.push((await channel.queryBlock(i)).data.data[0].payload.header.channel_header);
                } catch(err){
                    console.log(err);
                }
            }
            //console.log(tempBlockinfo);
            //console.log(tempBlock_data_transaction_info);

            return tempBlockinfo;
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            process.exit(1);
        }
    }

    
};

