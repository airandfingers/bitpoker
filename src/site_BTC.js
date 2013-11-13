var site_BTC = new function(){
	var self = this

//PARSES A KEY, NOT SURE IF IT ALWAYS THROWS ERROR IF INVALID OR NOT
    var parseBase58Check(address) = function {
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

BTC.newAddress = function(){

var private;var public; var address;

//GENERATE PRIVATE
 var randomBytes = Crypto.util.randomBytes(32)
var private = new Bitcoin.Address(randomBytes).toString()

//generate PUBLIC
var curve = getSECCurveByName("secp256k1") //found in bitcoinjs-lib/src/jsbn/sec.js

//convert our random array or private key to a Big Integer
var privateKeyBN = BigInteger.fromByteArrayUnsigned(private) 

var curvePt = curve.getG().multiply(privateKeyBN)
var x = curvePt.getX().toBigInteger()
var y = curvePt.getY().toBigInteger()
var publicKeyBytes = integerToBytes(x,32) //integerToBytes is found in bitcoinjs-lib/src/ecdsa.js
publicKeyBytes = publicKeyBytes.concat(integerToBytes(y,32))
publicKeyBytes.unshift(0x04)
var publicKeyHex = Crypto.util.bytesToHex(publicKeyBytes)

}

*/

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

var isPrivateCompressed = function(key){

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
this.getAddress = function(key, type){



if (type === 'public'){

var addr = '';

        try {
            var res = parseBase58Check(sec); 
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
            eckey.pub = getEncoded(pt, compressed);
            eckey.pubKeyHash = Bitcoin.Util.sha256ripe160(eckey.pub);
            addr = new Bitcoin.Address(eckey.getPubKeyHash());
            addr.version = (version-128)&255;
        } catch (err) {   }
}//if parameter is private key


return addr

}



this.Transaction = function(privateKey, destinationAddress, BTC, fee){

console.log('Transaction called')
var raw; var JSON;

var sourceAddress = self.getAddress(privateKey, 'public')

        var sec = privateKey
        var addr = sourceAddress
        var unspent = 1000
        var balance = 10000
      if(!fee){  var fee = 0 }



        try {
            var res = parseBase58Check(privateKey); 
            console.log(res)
            var version = res[0];
            var payload = res[1];
        } catch (err) {          console.log('bad key');  return;        }

//DETECT WHETHER PRIVATE KEY IS COMPRESSED OR NOT
        var compressed = false;
        if (payload.length > 32) {
            payload.pop();
            compressed = true;
        }

console.log('compressed = ' + compressed)
        var eckey = new Bitcoin.ECKey(payload);
        console.log(eckey)
        eckey.setCompressed(compressed);
        console.log(eckey)

        TX.init(eckey);
console.log(eckey)
/*
        var fval = 0;
        var o = txGetOutputs();
        for (i in o) {
            TX.addOutput(o[i].dest, o[i].fval);
            fval += o[i].fval;
        }

        // send change back or it will be sent as fee
        if (balance > fval + fee) {
            var change = balance - fval - fee;
            TX.addOutput(addr, change);
        }

*/
        try {
            var sendTx = TX.construct();
            console.log('sendTX = ')
            console.log(sendTx)
            var txJSON = TX.toBBE(sendTx);
                console.log('txJSON = ')
            console.log(txJSON)
            var buf = sendTx.serialize();
                console.log('buf = ')
            console.log(buf)
            var txHex = Crypto.util.bytesToHex(buf);
                console.log('txHex = ')
            console.log(txHex)
          
        } catch(err) {  console.error('failed to produce json/hex transaction')      }

console.log(sendTx)
console.log(txJSON)


this.JSON = txJSON
this.raw = txHex
this.hex = txHex

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