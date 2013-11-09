var BTC = function(){



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


this.Transaction = function(privateKey, destinationAddress, BTC, fee)


//generate secret exponent (private key but not in bitcoin format)
 
Crypto.util.bytesToHex(bytes))

}