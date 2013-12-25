

module.exports = new function(){

//console.log(JSON.parse)
//console.log(JSON.stringify)
var JSONparse = JSON.parse
var JSONstringify = JSON.stringify
var JSONparseJSON = JSON.parseJSON
//console.log(JSONparseJSON)

require('./lib/tx.js');
require('./lib/bitcoinsig.js');
require('./lib/bitcoinjs-min.js');

var request = require('request')
var async = require('async')
var TX = require('./lib/tx.js')
console.log('TX = ' + typeof TX)
var _ = require('underscore')

    var self = this

var removeAllWhitespace = function(str){return str.replace(/ /g,'')}

//PARSES A KEY, NOT SURE IF IT ALWAYS THROWS ERROR IF INVALID OR NOT
    var parseBase58Check= function (address) {
      var address = removeAllWhitespace(address)
      console.log('parseBase58Check called address of:' + address)
        var bytes = Bitcoin.Base58.decode(address);
        var end = bytes.length - 4;
        var hash = bytes.slice(0, end);
        var checksum = Crypto.SHA256(Crypto.SHA256(hash, {asBytes: true}), {asBytes: true});
        if (checksum[0] != bytes[end] ||
            checksum[1] != bytes[end+1] ||
            checksum[2] != bytes[end+2] ||
            checksum[3] != bytes[end+3])
                throw new Error("Wrong checksum");
        var version = hash.shift();
        return [version, hash];
    }

/*


//Usefull Functions
function checkBin(n){return/^[01]{1,64}$/.test(n)}
function checkDec(n){return/^[0-9]{1,64}$/.test(n)}

function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
function unpad(s){s=""+s;return s.replace(/^0+/,'')}

//Decimal operations
function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return n.toString(2)}
function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return n.toString(16)}

//Binary Operations
function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(10)}
function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16)}

//Hexadecimal Operations
function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
*/
var checkHex = function(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
var hex2Dec = function(n){if(!checkHex(n)){return};return parseInt(n,16).toString(10)}


//returns compressed private and public keys. compressed = normal, and carry all the data of an uncompressed key
//also known as Wallet Import Format
this.Address = function(){

 var privateKeyBytes = Crypto.util.randomBytes(32)

var eckey = new Bitcoin.ECKey(privateKeyBytes)
eckey.compressed = true
var address = eckey.getBitcoinAddress().toString()


var privateKeyBytesCompressed = privateKeyBytes.slice(0) //clone array
privateKeyBytesCompressed.push(0x01)
var privateKeyWIFCompressed = new Bitcoin.Address(privateKeyBytesCompressed)
privateKeyWIFCompressed.version = 0x80
privateKeyWIFCompressed = privateKeyWIFCompressed.toString()

this.private = privateKeyWIFCompressed
this.address = address
//console.log(address)
//console.log(privateKeyWIFCompressed) 

}


    //returns array of integars representing point on curve (public key)
    //length 33 for compressed, length 65 for uncompressed, 
    //curve.getG().multiply(uncompressedPrivateKey)  = pt //this may or may not work for compressed private keys
    var getEncoded = function(pt, compressed) {

       var x = pt.getX().toBigInteger();
       var y = pt.getY().toBigInteger();
     //  console.log('integerToBytes = ' + typeof integerToBytes)
       var enc = integerToBytes(x, 32);
   //    console.log('enc')
       if (compressed) {
         if (y.isEven()) {
           enc.unshift(0x02);
         } else {
           enc.unshift(0x03);
         }
       } else {
         enc.unshift(0x04);
         enc = enc.concat(integerToBytes(y, 32));
       }
       return enc;
    }



var isPrivateCompressed = function(key){//returns true if compressed, false if not compressed, undefined if invalid

var key = removeAllWhitespace(key)

 try {
            var res = parseBase58Check(key); 
            var version = res[0];
            var payload = res[1];
            //DETERMINE WHETHER PRIVATE KEY IS COMPRESSED
            var compressed = false;
            if (payload.length > 32) { compressed = true;}//if compressed

        } catch (err) { console.error('parameter not a private key')  }

return compressed

}

var isPublicCompressed = function(key){



}

//GET ADDRESS FROM A KEY (currently only private is implemented)
this.getAddress = function(key, type, options){

key = removeAllWhitespace(key)

if(!options){var options = {}}
    else {var options = _.clone(options)}
var defaults = {
    compressed:true
}//defaults

options = _.defaults(options, defaults)

if (type === 'private'){

console.log('get address called with privatekey = ' + key)

        try {
            var res = parseBase58Check(key); 
            var version = res[0];
            var payload = res[1];
            //DETERMINE WHETHER PRIVATE KEY IS COMPRESSED
            var compressed = false;
            if (payload.length > 32) {
                payload.pop();
                compressed = true;
            }//if compressed
            var eckey = new Bitcoin.ECKey(payload);
            var curve = getSECCurveByName("secp256k1");

            var pt = curve.getG().multiply(eckey.priv);
         //   console.log('pt calculated')
            eckey.pub = getEncoded(pt, compressed);
       //     console.log('eckey.pub assigned')
            eckey.pubKeyHash = Bitcoin.Util.sha256ripe160(eckey.pub);
        //    console.log('eckey.pubKeyHash assigned')
          var  addr = new Bitcoin.Address(eckey.getPubKeyHash());
            addr.version = (version-128)&255;
            console.log('calculated from private key, address is = ' + addr.toString())
        } catch (err) { console.log('error retreiving address from private key')  }


}//if parameter is private key

//return '1CHWyhYe8eeTXwttwV9uZaGTQnjzqnZ4s3'
//console.log(addr.toString())
return addr.toString()

}

/*
this.validate = function(data, type){

//validate bitcoin address
if(type == 'address' || type == 'addr'){

var address = data

try{
address = parseBase58Check(data) //convert to integar array
address = Crypto.util.bytesToHex(publicKeyBytes) //convert to hex
address = '00' + address
address = address.substring(0,address.length-8) //remove last 8 digits of addres

address = hex2Bin(address) //convert from hex to binary
address = Crytpo.util.SHA256(address) //sha256 once
address = Crytpo.util.SHA256(address) //sha256 twice

if(address.indexOf(0) != -1
    ||address.indexOf('O') != -1
    ||address.indexOf('I') != -1
    ||addres.indexOf('l') != -1


}catch(err){return false}




}//validate bitcoin address

}//validation
*/

//get info from http://blockexplorer.com/q/mytransactions/<address>
var fetch = function(url, onSuccess, onError, postdata) {
console.log('fetching from: '+url)
   
    request(url, function(request_err, response, body) {
      if (! request_err && response &&
          response.statusCode !== 200 &&
          response.statusCode !== 201) {
        request_err = new Error('Unsuccessful response code:' + response.statusCode);
      }
      if (request_err) {
        console.log(response.body)
        console.error('Error while fetching:', request_err);
        if(_.isFunction(onError)){return onError(request_err)}
            else{return}
      }//if error
 // console.log(typeof response.body)
   //   var body = JSON.parse(response.body);
 //     console.log('Received response from blockchain:', response.body);
console.log(response.body)
      onSuccess(null, response.body);
    });
}




this.Transaction = function(privateKey, destinationAddress, BTC, fee, options){

if(!options){var options = {}}
    var Transaction = this
var tx = new TX()
//console.log(JSON.parse)


//console.log('Transaction called')
var raw; var JSON;

var outputs = []
var sourceAddress = self.getAddress(privateKey, 'private') //get address from private key
if(!_.isString(sourceAddress)){console.log(privateKey)}
  if(options.testTxUnspentFetch === true){sourceAddress = '1Hco7Zx3W1z8scgxZLoc3nupLJuqaoKpCS'}
var txUnspent
var balance
if(!fee){  var fee = 0 }

async.series([function(callback){

 fetch ('http://blockchain.info/unspent?address=' + sourceAddress
    ,function(err, responseText){
      txUnspent = responseText
   //   console.log('fetch completed')
    //  console.log(txUnspent)
      callback(null, 'fetch')
    } 
,function(err){callback('error', 'fetch')}
    )



},//fetch source data

function(callback){

//initialize TX 

        try {
          console.log(parseBase58Check)
            var res = parseBase58Check(privateKey); 

//            console.log(res)
            var version = res[0];
            var payload = res[1];
        } catch (err) {   console.log('bad key');  return;        }

//DETECT WHETHER PRIVATE KEY IS COMPRESSED OR NOT
        var compressed = false;
        if (payload.length > 32) {
            payload.pop();
            compressed = true;
        }

//console.log('compressed = ' + compressed)
        var eckey = new Bitcoin.ECKey(payload);
    //    console.log(eckey)
        eckey.setCompressed(compressed);
  //      console.log(eckey)

        tx.init(eckey); //reset TX data
//console.log(eckey)

//set outputs
 var fval = 0;   //fval just means amount to send
        var destinationAddressArray = _.flatten([destinationAddress])
        var BTCArray =  _.flatten([BTC])
        console.log('btc array = ');console.log(BTCArray)

        _.each(destinationAddressArray, function(value, element, list){
            var amountToSend = BTCArray[element]
            console.log('amountToSend = ');console.log(amountToSend)
            if(_.isNumber(amountToSend) && !_.isNaN(amountToSend) && amountToSend > 0){
outputs.push({dest:value, fval:parseFloat('0'+amountToSend)})

}//if amountToSend > 0
        })//iterate through and make array of {dest:address, fval:amountToSend}


    for (var i in outputs) {
            tx.addOutput(outputs[i].dest, outputs[i].fval);
            fval += outputs[i].fval;
        }


        // send change back or it will be sent as fee
        if (balance > fval + fee) {
            var change = balance - fval - fee;
            tx.addOutput(sourceAddress, change);
        }


//set inputs to a transaction, text = raw data from 'https://blockchain.info/q/mytransaction/etc'
    var txSetUnspent = function(text) {
if(text.length == 0){return}

        if(_.isString(text)){var r = JSONparse(text)}
            else{var r = text}

console.log('original unspent outs')
             console.log(r['unspent_outputs'])

//take only unspents that are needed
var unspentOuts = r['unspent_outputs']
var inputTotal = 0
_.each(unspentOuts, function(value, index, list){

if(inputTotal < fval){inputTotal = inputTotal + value.value/(pow(10,8))}
else{unspentOuts.splice(index, 1)}
})//iterate thorugh unspent_outs
//1 BTC = 100,000,000 Satoshis


   //     txUnspent =  JSON.stringify(r, null, 4);
 txUnspent =  JSONstringify(r, null, 4);
     //   $('#txUnspent').val(txUnspent);
     //   var address = $('#txAddr').val();
     console.log('txunspent = ');console.log(txUnspent)

        tx.parseInputs(txUnspent, sourceAddress);
        var value = tx.getBalance();
        var fval = Bitcoin.Util.formatValue(value);
    //    var fee = parseFloat($('#txFee').val());
        balance = fval
     //   $('#txBalance').val(fval);
        var value = Math.floor((fval-fee)*1e8)/1e8;
     //   $('#txValue').val(value);
       // txRebuild(); //this is the parent function (was)
       return txUnspent
}

txUnspent = txSetUnspent(txUnspent) //if invalid txUnspent we will check below along with balance

//check if available
if((!_.isObject(txUnspent) && !_.isString(txUnspent) )|| balance < fval + fee){callback('no unspent available', 'parse')}


callback(null, 'parse')


}//parsedata


],

//onComplete
function(err, results){

console.log('transaction function fetched and parsed with the following errors/results: ')
console.log(err)
console.log(results)

if(err){



}

else{

  try {
            var sendTx = tx.construct();
     //      console.log('sendtx = ');console.log(sendTx)
            var txJSON = tx.toBBE(sendTx) //.toString()
      // txJSON = txJSON.toString()
   //   console.log('txJSON = ');console.log(txJSON)
         
            var buf = sendTx.serialize();
       //     console.log('txJSON after sendTx.serialize = ');console.log(txJSON)
            var txHex = Crypto.util.bytesToHex(buf)
   //         console.log(txJSON)
    // console.log(txHex)
    //      var txHex = txHex.replace(/[^0-9a-fA-f]/g,''); //replace /n new line stuff
    //      console.log(txHex)
        } catch(err) {  console.error('failed to produce json/hex transaction')      }
/*
//sign transaction
tx.removeOutputs()
*/


}


Transaction.JSON = txJSON
Transaction.raw = txHex
Transaction.hex = txHex
Transaction.data = JSONparse(txJSON)


if(_.isFunction(options.callback)){options.callback(Transaction)}

}//construct


)





}


this.getReceivedByTotal = function(address, callback, confirmations){

if(!_.isNumber(confirmations)){var confirmations = 1}

//request BlockCHAIN API:
var blockChainURL =  'https://blockchain.info/q/getreceivedbyaddress' + '?'+confirmations


}

this.subscribe = function(address, callback){

//must be connected to blockchain websocket
/*
ws://ws.blockchain.info/inv
OR

ws://ws.blockchain.info:8335/inv
*/

socket.emit({"op":"addr_sub", "addr":address})


}



}//BTC constructor