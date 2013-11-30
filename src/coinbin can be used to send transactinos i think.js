/*
http://coinb.in bitcoin class.

requires
	jquery (1.7.2)
	bitcoinjs-min.js (v0.1.3)
	aes cytpo js support; see crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js
	
by OutCast3k, thanks to bitcoin.it, bitcoinjs.org and brainwallet.org
*/

var coinbin = new function(){

	var uid = '1';
	var key = '12345678901234567890123456789012';

	this.generatenewkeys = function(secret, password) {
		var hash_str = Crypto.SHA256(secret);
		var hash = Crypto.util.hexToBytes(hash_str);
		var eckey = new Bitcoin.ECKey(hash);
		var pass = password || hash_str;
		var result = false;
		gen_eckey = eckey;
		try {
			var curve = getSECCurveByName("secp256k1");
			gen_pt = curve.getG().multiply(eckey.priv);
			eckey.pub = getEncoded(gen_pt, false);
			eckey.pubKeyHash = Bitcoin.Util.sha256ripe160(eckey.pub);
			var pub = eckey.getBitcoinAddress();
			var priv = new Bitcoin.Address(hash);
			priv.version = 128;

			var payload = this.encrypt(hash_str+','+pub+','+priv, pass);

			result = {'result':1, 'secret':hash_str, 'pubkey':pub, 'privkey':priv, 'payload':payload, 'payload_hash':Crypto.SHA256(payload), 'response':'keys generated'};
		} catch (err) {
			result = {'result':0,'error':err,'response':'Invalid secret exponent (must be non-zero value)'};
		}

		return result;
	}

	this.privtopub = function(key) {
		var secret = Bitcoin.Base58.decode(key).slice(1, 33);
		var eckey = new Bitcoin.ECKey(secret);
		return eckey.getBitcoinAddress().toString();
	}

	this.encrypt = function(str, key) {
		return ''+CryptoJS.AES.encrypt(str, Crypto.SHA256(key));
	}

	this.decrypt = function(str, key) {
		var result = '';
		try {
			var decrypted = CryptoJS.AES.decrypt(str, Crypto.SHA256(key));
			result = ''+decrypted.toString(CryptoJS.enc.Utf8);
		} catch (e) {
			
		}
		return result;
	}

	this.listunspent = function(pubkey, callback) {
		$.ajax ({
			type: "POST",
			url: "../api/",
			data: 'uid='+uid+'&key='+key+'&setmodule=addresses&request=unspent&address='+pubkey,
			dataType: "xml",
			error: function() {
				alert('Failed to submit, please try again');
			}, 
			success: function(data)	{
				callback(data);
			},
		});
	}

	this.sendrawtransaction = function(rawtx, callback) {
		$.ajax ({
			type: "POST",
			url: "../api/",
			data: 'uid='+uid+'&key='+key+'&setmodule=bitcoin&request=sendrawtransaction&rawtx='+rawtx,
			dataType: "xml",
			error: function() {
				alert('Failed to submit, please try again');
			}, 
			success: function(data)	{
				callback(data);
			},
		});
	}

	this.decoderawtransaction = function(rawtx, callback) {
		$.ajax ({
			type: "POST",
			url: "../api/",
			data: 'uid='+uid+'&key='+key+'&setmodule=bitcoin&request=decoderawtransaction&rawtx='+rawtx,
			dataType: "text",
			error: function() {
				alert('Failed to submit, please try again');
			}, 
			success: function(data)	{
				callback(data);
			},
		});
	}

	this.balance = function(unspent) {
		var balance = 0;
		$.each($(unspent).find("unspent").children(),function(i,o){
			balance = balance + ($(o).find("value").text()*1);
		});
		return balance;
	}

	this.buildrawtx = function(pubkey, privkey, input, output, fee) {
		var fee = fee || 0;
		var secret = Bitcoin.Base58.decode(privkey).slice(1, 33);
		var eckey = new Bitcoin.ECKey(secret);
		var balance = 0;
		var total = 0;

		TX.init(eckey);

		$.each($(input).find("unspent").children(),function(i,o){
			balance = balance + $(o).find("value").text();
			var unspent = [{'txid':$(o).find("txid").text(), 'n': $(o).find("n").text(), 'script':$(o).find("script").text(),'value': $(o).find("value").text()*1}];
			TX.addInputs(unspent, TX.getAddress());
		});

		for(var i in output){
			TX.addOutput(output[i].address, output[i].value);
			total = total + output[i].value; 
		}

		if (balance > total + fee) {
			var change = balance - total - fee;
			TX.addOutput(pubkey, change);
		}

		var sendTx = (TX.construct());
		return Crypto.util.bytesToHex(sendTx.serialize());
	}

	this.savewallet = function(u, k, label, pubkey, payload, hash, callback) {
		$.ajax({
			type: "POST",
			url: "../api/",
			data: 'uid='+u+'&key='+k+'&setmodule=wallet&request=save&label='+encodeURIComponent(label)+'&payload='+encodeURIComponent(payload)+'&hash='+hash+'&pubkey='+pubkey,
			dataType: "xml",
			error: function() {
			},
			success: function(data) {
				callback(data)
			}
		});
	}

	this.passwordchange = function(u, k, pubkey, payload, hash, callback) {
		$.ajax({
			type: "POST",
			url: "../api/",
			data: 'uid='+u+'&key='+k+'&setmodule=wallet&request=passwordchange&payload='+encodeURIComponent(payload)+'&hash='+hash+'&address='+pubkey,
			dataType: "xml",
			error: function() {
			},
			success: function(data) {
				callback(data)
			}
		});
	}

	this.getwallets = function(u, k, callback){
		$.ajax({
			type: "POST",
			url: "../api/",
			data: 'uid='+u+'&key='+k+'&setmodule=wallet&request=get',
			dataType: "xml",
			error: function() {
			},
			success: function(data) {
				callback(data);
			}
		})
	}

	this.parseBase58Check = function(address) {
		var bytes = Bitcoin.Base58.decode(address);
		var end = bytes.length - 4;
		var hash = bytes.slice(0, end);
		var checksum = Crypto.SHA256(Crypto.SHA256(hash, {asBytes: true}), {asBytes: true});
		var result = {};
		if (checksum[0] != bytes[end] || checksum[1] != bytes[end+1] || checksum[2] != bytes[end+2] || checksum[3] != bytes[end+3]) {
			result = {'result':0,'response':'wrong checksum'};
		} else {
			result = {'result':1,'version':hash.shift(),'hash':hash, 'response':'valid checksum'};
		}
		return result;
	}

	function getEncoded(pt, compressed) {
		var x = pt.getX().toBigInteger();
		var y = pt.getY().toBigInteger();
		var enc = integerToBytes(x, 32);
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
}
