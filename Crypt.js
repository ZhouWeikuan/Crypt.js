var Crypt = {
	SMALL_CHUNK: 256,

	/* the eight DES S-boxes */
	SB1: [
		0x01010400, 0x00000000, 0x00010000, 0x01010404,
		0x01010004, 0x00010404, 0x00000004, 0x00010000,
		0x00000400, 0x01010400, 0x01010404, 0x00000400,
		0x01000404, 0x01010004, 0x01000000, 0x00000004,
		0x00000404, 0x01000400, 0x01000400, 0x00010400,
		0x00010400, 0x01010000, 0x01010000, 0x01000404,
		0x00010004, 0x01000004, 0x01000004, 0x00010004,
		0x00000000, 0x00000404, 0x00010404, 0x01000000,
		0x00010000, 0x01010404, 0x00000004, 0x01010000,
		0x01010400, 0x01000000, 0x01000000, 0x00000400,
		0x01010004, 0x00010000, 0x00010400, 0x01000004,
		0x00000400, 0x00000004, 0x01000404, 0x00010404,
		0x01010404, 0x00010004, 0x01010000, 0x01000404,
		0x01000004, 0x00000404, 0x00010404, 0x01010400,
		0x00000404, 0x01000400, 0x01000400, 0x00000000,
		0x00010004, 0x00010400, 0x00000000, 0x01010004
	],

	SB2: [
		0x80108020, 0x80008000, 0x00008000, 0x00108020,
		0x00100000, 0x00000020, 0x80100020, 0x80008020,
		0x80000020, 0x80108020, 0x80108000, 0x80000000,
		0x80008000, 0x00100000, 0x00000020, 0x80100020,
		0x00108000, 0x00100020, 0x80008020, 0x00000000,
		0x80000000, 0x00008000, 0x00108020, 0x80100000,
		0x00100020, 0x80000020, 0x00000000, 0x00108000,
		0x00008020, 0x80108000, 0x80100000, 0x00008020,
		0x00000000, 0x00108020, 0x80100020, 0x00100000,
		0x80008020, 0x80100000, 0x80108000, 0x00008000,
		0x80100000, 0x80008000, 0x00000020, 0x80108020,
		0x00108020, 0x00000020, 0x00008000, 0x80000000,
		0x00008020, 0x80108000, 0x00100000, 0x80000020,
		0x00100020, 0x80008020, 0x80000020, 0x00100020,
		0x00108000, 0x00000000, 0x80008000, 0x00008020,
		0x80000000, 0x80100020, 0x80108020, 0x00108000
	],

	SB3: [
		0x00000208, 0x08020200, 0x00000000, 0x08020008,
		0x08000200, 0x00000000, 0x00020208, 0x08000200,
		0x00020008, 0x08000008, 0x08000008, 0x00020000,
		0x08020208, 0x00020008, 0x08020000, 0x00000208,
		0x08000000, 0x00000008, 0x08020200, 0x00000200,
		0x00020200, 0x08020000, 0x08020008, 0x00020208,
		0x08000208, 0x00020200, 0x00020000, 0x08000208,
		0x00000008, 0x08020208, 0x00000200, 0x08000000,
		0x08020200, 0x08000000, 0x00020008, 0x00000208,
		0x00020000, 0x08020200, 0x08000200, 0x00000000,
		0x00000200, 0x00020008, 0x08020208, 0x08000200,
		0x08000008, 0x00000200, 0x00000000, 0x08020008,
		0x08000208, 0x00020000, 0x08000000, 0x08020208,
		0x00000008, 0x00020208, 0x00020200, 0x08000008,
		0x08020000, 0x08000208, 0x00000208, 0x08020000,
		0x00020208, 0x00000008, 0x08020008, 0x00020200
	],

	SB4: [
		0x00802001, 0x00002081, 0x00002081, 0x00000080,
		0x00802080, 0x00800081, 0x00800001, 0x00002001,
		0x00000000, 0x00802000, 0x00802000, 0x00802081,
		0x00000081, 0x00000000, 0x00800080, 0x00800001,
		0x00000001, 0x00002000, 0x00800000, 0x00802001,
		0x00000080, 0x00800000, 0x00002001, 0x00002080,
		0x00800081, 0x00000001, 0x00002080, 0x00800080,
		0x00002000, 0x00802080, 0x00802081, 0x00000081,
		0x00800080, 0x00800001, 0x00802000, 0x00802081,
		0x00000081, 0x00000000, 0x00000000, 0x00802000,
		0x00002080, 0x00800080, 0x00800081, 0x00000001,
		0x00802001, 0x00002081, 0x00002081, 0x00000080,
		0x00802081, 0x00000081, 0x00000001, 0x00002000,
		0x00800001, 0x00002001, 0x00802080, 0x00800081,
		0x00002001, 0x00002080, 0x00800000, 0x00802001,
		0x00000080, 0x00800000, 0x00002000, 0x00802080
	],

	SB5: [
		0x00000100, 0x02080100, 0x02080000, 0x42000100,
		0x00080000, 0x00000100, 0x40000000, 0x02080000,
		0x40080100, 0x00080000, 0x02000100, 0x40080100,
		0x42000100, 0x42080000, 0x00080100, 0x40000000,
		0x02000000, 0x40080000, 0x40080000, 0x00000000,
		0x40000100, 0x42080100, 0x42080100, 0x02000100,
		0x42080000, 0x40000100, 0x00000000, 0x42000000,
		0x02080100, 0x02000000, 0x42000000, 0x00080100,
		0x00080000, 0x42000100, 0x00000100, 0x02000000,
		0x40000000, 0x02080000, 0x42000100, 0x40080100,
		0x02000100, 0x40000000, 0x42080000, 0x02080100,
		0x40080100, 0x00000100, 0x02000000, 0x42080000,
		0x42080100, 0x00080100, 0x42000000, 0x42080100,
		0x02080000, 0x00000000, 0x40080000, 0x42000000,
		0x00080100, 0x02000100, 0x40000100, 0x00080000,
		0x00000000, 0x40080000, 0x02080100, 0x40000100
	],

	SB6: [
		0x20000010, 0x20400000, 0x00004000, 0x20404010,
		0x20400000, 0x00000010, 0x20404010, 0x00400000,
		0x20004000, 0x00404010, 0x00400000, 0x20000010,
		0x00400010, 0x20004000, 0x20000000, 0x00004010,
		0x00000000, 0x00400010, 0x20004010, 0x00004000,
		0x00404000, 0x20004010, 0x00000010, 0x20400010,
		0x20400010, 0x00000000, 0x00404010, 0x20404000,
		0x00004010, 0x00404000, 0x20404000, 0x20000000,
		0x20004000, 0x00000010, 0x20400010, 0x00404000,
		0x20404010, 0x00400000, 0x00004010, 0x20000010,
		0x00400000, 0x20004000, 0x20000000, 0x00004010,
		0x20000010, 0x20404010, 0x00404000, 0x20400000,
		0x00404010, 0x20404000, 0x00000000, 0x20400010,
		0x00000010, 0x00004000, 0x20400000, 0x00404010,
		0x00004000, 0x00400010, 0x20004010, 0x00000000,
		0x20404000, 0x20000000, 0x00400010, 0x20004010
	],

	SB7: [
		0x00200000, 0x04200002, 0x04000802, 0x00000000,
		0x00000800, 0x04000802, 0x00200802, 0x04200800,
		0x04200802, 0x00200000, 0x00000000, 0x04000002,
		0x00000002, 0x04000000, 0x04200002, 0x00000802,
		0x04000800, 0x00200802, 0x00200002, 0x04000800,
		0x04000002, 0x04200000, 0x04200800, 0x00200002,
		0x04200000, 0x00000800, 0x00000802, 0x04200802,
		0x00200800, 0x00000002, 0x04000000, 0x00200800,
		0x04000000, 0x00200800, 0x00200000, 0x04000802,
		0x04000802, 0x04200002, 0x04200002, 0x00000002,
		0x00200002, 0x04000000, 0x04000800, 0x00200000,
		0x04200800, 0x00000802, 0x00200802, 0x04200800,
		0x00000802, 0x04000002, 0x04200802, 0x04200000,
		0x00200800, 0x00000000, 0x00000002, 0x04200802,
		0x00000000, 0x00200802, 0x04200000, 0x00000800,
		0x04000002, 0x04000800, 0x00000800, 0x00200002
	],

	SB8: [
		0x10001040, 0x00001000, 0x00040000, 0x10041040,
		0x10000000, 0x10001040, 0x00000040, 0x10000000,
		0x00040040, 0x10040000, 0x10041040, 0x00041000,
		0x10041000, 0x00041040, 0x00001000, 0x00000040,
		0x10040000, 0x10000040, 0x10001000, 0x00001040,
		0x00041000, 0x00040040, 0x10040040, 0x10041000,
		0x00001040, 0x00000000, 0x00000000, 0x10040040,
		0x10000040, 0x10001000, 0x00041040, 0x00040000,
		0x00041040, 0x00040000, 0x10041000, 0x00001000,
		0x00000040, 0x10040040, 0x00001000, 0x00041040,
		0x10001000, 0x00000040, 0x10000040, 0x10040000,
		0x10040040, 0x10000000, 0x00040000, 0x10001040,
		0x00000000, 0x10041040, 0x00040040, 0x10000040,
		0x10040000, 0x10001000, 0x10001040, 0x00000000,
		0x10041040, 0x00041000, 0x00041000, 0x00001040,
		0x00001040, 0x00040040, 0x10000000, 0x10041000
	],

	/* PC1: left and right halves bit-swap */

	LHs: [
		0x00000000, 0x00000001, 0x00000100, 0x00000101,
		0x00010000, 0x00010001, 0x00010100, 0x00010101,
		0x01000000, 0x01000001, 0x01000100, 0x01000101,
		0x01010000, 0x01010001, 0x01010100, 0x01010101
	],

	RHs: [
		0x00000000, 0x01000000, 0x00010000, 0x01010000,
		0x00000100, 0x01000100, 0x00010100, 0x01010100,
		0x00000001, 0x01000001, 0x00010001, 0x01010001,
		0x00000101, 0x01000101, 0x00010101, 0x01010101,
	],

	/* Initial Permutation macro */
	DES_IP: function (X, Y) {
		var T = ((X >>>  4) ^ Y) & 0x0F0F0F0F; Y ^= T; X ^= (T <<  4);
		T = ((X >>> 16) ^ Y) & 0x0000FFFF; Y ^= T; X ^= (T << 16);
		T = ((Y >>>  2) ^ X) & 0x33333333; X ^= T; Y ^= (T <<  2);
		T = ((Y >>>  8) ^ X) & 0x00FF00FF; X ^= T; Y ^= (T <<  8);
		Y = ((Y << 1) | (Y >>> 31)) & 0xFFFFFFFF;
		T = (X ^ Y) & 0xAAAAAAAA; Y ^= T; X ^= T;
		X = ((X << 1) | (X >>> 31)) & 0xFFFFFFFF;
		X = dcodeIO.Long.fromInt(X).toUnsigned().toInt();
		Y = dcodeIO.Long.fromInt(Y).toUnsigned().toInt();
		return [X, Y];
	},

	/* Final Permutation macro */
	DES_FP: function (X, Y) {
		X = (X << 31) | (X >>> 1);
		var T = (X ^ Y) & 0xAAAAAAAA; X ^= T; Y ^= T;
		Y = (Y << 31) | (Y >>> 1);
		T = ((Y >>>  8) ^ X) & 0x00FF00FF; X ^= T; Y ^= (T <<  8);
		T = ((Y >>>  2) ^ X) & 0x33333333; X ^= T; Y ^= (T <<  2);
		T = ((X >>> 16) ^ Y) & 0x0000FFFF; Y ^= T; X ^= (T << 16);
		T = ((X >>>  4) ^ Y) & 0x0F0F0F0F; Y ^= T; X ^= (T <<  4);
		X = dcodeIO.Long.fromInt(X).toUnsigned().toInt();
		Y = dcodeIO.Long.fromInt(Y).toUnsigned().toInt();
		return [X, Y];
	},

	/* DES round macro */
	DES_ROUND: function (SK, i, X, Y) {
		var T = SK.readUint32(i) ^ X;
		var v = Crypt.SB8[ (T	   ) & 0x3F ] ^
			 Crypt.SB6[ (T >>>  8) & 0x3F ] ^
			 Crypt.SB4[ (T >>> 16) & 0x3F ] ^
			 Crypt.SB2[ (T >>> 24) & 0x3F ];
		Y ^= v;
		Y = dcodeIO.Long.fromInt(Y).toUnsigned().toInt();

		T = SK.readUint32(i + 4) ^ (((X << 28) | (X >>> 4)) & 0xFFFFFFFF);
		v = Crypt.SB7[ (T	   ) & 0x3F ] ^
			 Crypt.SB5[ (T >>>  8) & 0x3F ] ^
			 Crypt.SB3[ (T >>> 16) & 0x3F ] ^
			 Crypt.SB1[ (T >>> 24) & 0x3F ];
		Y ^= v;
		Y = dcodeIO.Long.fromInt(Y).toUnsigned().toInt();
		return [X, Y];
	},

	/* DES key schedule */
	// char[8] key
	des_main_ks: function (key) {
		var X = key.readUint32(0);
		var Y = key.readUint32(4);

		/* Permuted Choice 1 */
		var T =  ((Y >>  4) ^ X) & 0x0F0F0F0F;  X ^= T; Y ^= (T <<  4) & 0xFFFFFFFF;
		T =  ((Y	  ) ^ X) & 0x10101010;  X ^= T; Y ^= (T	  );

		X =   (Crypt.LHs[ (X	  ) & 0xF] << 3) | (Crypt.LHs[ (X >>>  8) & 0xF ] << 2)
			| (Crypt.LHs[ (X >>> 16) & 0xF] << 1) | (Crypt.LHs[ (X >>> 24) & 0xF ]	 )
			| (Crypt.LHs[ (X >>>  5) & 0xF] << 7) | (Crypt.LHs[ (X >>> 13) & 0xF ] << 6)
			| (Crypt.LHs[ (X >>> 21) & 0xF] << 5) | (Crypt.LHs[ (X >>> 29) & 0xF ] << 4);

		Y =   (Crypt.RHs[ (Y >>>  1) & 0xF] << 3) | (Crypt.RHs[ (Y >>>  9) & 0xF ] << 2)
			| (Crypt.RHs[ (Y >>> 17) & 0xF] << 1) | (Crypt.RHs[ (Y >>> 25) & 0xF ]	 )
			| (Crypt.RHs[ (Y >>>  4) & 0xF] << 7) | (Crypt.RHs[ (Y >>> 12) & 0xF ] << 6)
			| (Crypt.RHs[ (Y >>> 20) & 0xF] << 5) | (Crypt.RHs[ (Y >>> 28) & 0xF ] << 4);

		X &= 0x0FFFFFFF;
		Y &= 0x0FFFFFFF;
		X = dcodeIO.Long.fromInt(X).toUnsigned().toInt();
		Y = dcodeIO.Long.fromInt(Y).toUnsigned().toInt();

		/* calculate subkeys */
		var SK = dcodeIO.ByteBuffer.allocate(4 * 32);
		for (var i = 0; i < 16; i++ ) {
			if( i < 2 || i == 8 || i == 15 ) {
				X = ((X <<  1) | (X >>> 27)) & 0x0FFFFFFF;
				Y = ((Y <<  1) | (Y >>> 27)) & 0x0FFFFFFF;
			} else {
				X = ((X <<  2) | (X >>> 26)) & 0x0FFFFFFF;
				Y = ((Y <<  2) | (Y >>> 26)) & 0x0FFFFFFF;
			}

			var v =   ((X <<  4) & 0x24000000) | ((X << 28) & 0x10000000)
					| ((X << 14) & 0x08000000) | ((X << 18) & 0x02080000)
					| ((X <<  6) & 0x01000000) | ((X <<  9) & 0x00200000)
					| ((X >>>  1) & 0x00100000) | ((X << 10) & 0x00040000)
					| ((X <<  2) & 0x00020000) | ((X >>> 10) & 0x00010000)
					| ((Y >>> 13) & 0x00002000) | ((Y >>>  4) & 0x00001000)
					| ((Y <<  6) & 0x00000800) | ((Y >>>  1) & 0x00000400)
					| ((Y >>> 14) & 0x00000200) | ((Y	  ) & 0x00000100)
					| ((Y >>>  5) & 0x00000020) | ((Y >>> 10) & 0x00000010)
					| ((Y >>>  3) & 0x00000008) | ((Y >>> 18) & 0x00000004)
					| ((Y >>> 26) & 0x00000002) | ((Y >>> 24) & 0x00000001);
			SK.writeUint32(v, i * 2 * 4);

			v =   ((X << 15) & 0x20000000) | ((X << 17) & 0x10000000)
					| ((X << 10) & 0x08000000) | ((X << 22) & 0x04000000)
					| ((X >>>  2) & 0x02000000) | ((X <<  1) & 0x01000000)
					| ((X << 16) & 0x00200000) | ((X << 11) & 0x00100000)
					| ((X <<  3) & 0x00080000) | ((X >>>  6) & 0x00040000)
					| ((X << 15) & 0x00020000) | ((X >>>  4) & 0x00010000)
					| ((Y >>>  2) & 0x00002000) | ((Y <<  8) & 0x00001000)
					| ((Y >>> 14) & 0x00000808) | ((Y >>>  9) & 0x00000400)
					| ((Y	   ) & 0x00000200) | ((Y <<  7) & 0x00000100)
					| ((Y >>>  7) & 0x00000020) | ((Y >>>  3) & 0x00000011)
					| ((Y <<  2) & 0x00000004) | ((Y >>> 21) & 0x00000002);
			SK.writeUint32(v, (i * 2 + 1) * 4);
		}
		return SK;
	},

	/* DES 64-bit block encryption/decryption */
	des_crypt: function (SK, input, output, index) {
		var X = input.readUint32(0);
		var Y = input.readUint32(4);

		var a = Crypt.DES_IP( X, Y );
		X = a[0]; Y = a[1];

		for (var i=0; i<8; ++i) {
			a = Crypt.DES_ROUND(SK, i * 16, Y, X);
			Y = a[0]; X = a[1];

			a = Crypt.DES_ROUND(SK, i * 16 + 8, X, Y);
			X = a[0]; Y = a[1];
		}

		a = Crypt.DES_FP(Y, X);
		Y = a[0]; X = a[1];

		output.writeUint32(Y, 0 + index);
		output.writeUint32(X, 4 + index);
	},

	randomkey: function () {
		var tmp = dcodeIO.ByteBuffer.allocate(8);
		var x = 0;
		for (var i = 0; i<8; i++) {
			var t = (Math.random() * 256) & 0xff;
			x ^= t;
			tmp.writeByte(t, i);
		}
		if (x == 0) {
			tmp.writeByte(tmp.readUint8() | 1, 0);
		}
		return tmp.toBinary();
	},

	// char[8] key
	des_key: function (key) {
		if (key.length != 8) {
			window.alert("Invalid key size, need 8 bytes, but provided " + key.length);
			return;
		}
		return Crypt.des_main_ks(dcodeIO.ByteBuffer.fromBinary(key));
	},

	// char[8] key, string text
	desencode: function (key, text) {
		var SK = Crypt.des_key(key);

		var textsz = text.length;
		var chunksz = (textsz + 8) & ~7;
		var buffer = dcodeIO.ByteBuffer.allocate(chunksz > Crypt.SMALL_CHUNK ? chunksz : Crypt.SMALL_CHUNK);
		var part;

		var i;
		for (i=0; i<textsz-7; i+=8) {
			part = dcodeIO.ByteBuffer.fromBinary(text.substr(i, i + 8));
			Crypt.des_crypt(SK, part, buffer, i);
		}

		var bytes = textsz - i;
		var tail = dcodeIO.ByteBuffer.allocate(8);
		for (var j=0; j<8; j++) {
			if (j < bytes) {
				tail.writeByte(text.charCodeAt(i+j), j);
			} else if (j==bytes) {
				tail.writeByte(0x80, j);
			} else {
				tail.writeByte(0, j);
			}
		}
		Crypt.des_crypt(SK, tail, buffer, i);
		return buffer.toBinary(0, chunksz);
	},

	desdecode: function (key, text) {
		var ESK = Crypt.des_key(key);
		var SK = dcodeIO.ByteBuffer.allocate(32 * 4);
		var i;
		for( i = 0; i < 32; i += 2 ) {
			SK.writeUint32(ESK.readUint32((30 - i) * 4), i * 4);
			SK.writeUint32(ESK.readUint32((31 - i) * 4), (i + 1) * 4);
		}
		var textsz = text.length;
		if ((textsz & 7) || textsz == 0) {
			window.alert( "Invalid des crypt text length " + textsz);
			return;
		}

		var buffer = dcodeIO.ByteBuffer.allocate(textsz > Crypt.SMALL_CHUNK ? textsz : Crypt.SMALL_CHUNK);
		var part;
		for (i=0; i<textsz; i+=8) {
			part = dcodeIO.ByteBuffer.fromBinary(text.substr(i, i + 8));
			Crypt.des_crypt(SK, part, buffer, i);
		}

		var padding = 1;
		for (i=textsz-1; i>=textsz-8; i--) {
			if (buffer.readUint8(i) == 0) {
				padding++;
			} else if (buffer.readUint8(i) == 0x80) {
				break;
			} else {
				window.alert("Invalid des crypt text: " +  buffer.readUint8(i) + "," + i);
				return;
			}
		}
		if (padding > 8) {
			window.alert("Invalid des crypt text");
			return;
		}
		return buffer.toBinary(0, textsz - padding);
	},

	// const char * str, int sz, uint8_t key[8]
	Hash: function (str) {
		var djb_hash    = dcodeIO.Long.fromInt(5381).toUnsigned();
		var js_hash 	= dcodeIO.Long.fromInt(1315423911).toUnsigned();

		for (var i=0; i<str.length; ++i) {
			var c = str.charCodeAt(i);
			djb_hash = djb_hash.shiftLeft(5).add(c).add(djb_hash).and(0xFFFFFFFF);

			var v = js_hash.shiftLeft(5).add(c).add(js_hash.shiftRightUnsigned(2));
			js_hash = js_hash.xor(v).and(0xFFFFFFFF);
		}

		var key = dcodeIO.ByteBuffer.allocate(8);
		key.writeByte(djb_hash.and(0xff).toInt(), 0);
		key.writeByte(djb_hash.shiftRightUnsigned(8).and(0xff).toInt(), 1);
		key.writeByte(djb_hash.shiftRightUnsigned(16).and(0xff).toInt(), 2);
		key.writeByte(djb_hash.shiftRightUnsigned(24).and(0xff).toInt(), 3);

		key.writeByte(js_hash.and(0xff).toInt(), 4);
		key.writeByte(js_hash.shiftRightUnsigned(8).and(0xff).toInt(), 5);
		key.writeByte(js_hash.shiftRightUnsigned(16).and(0xff).toInt(), 6);
		key.writeByte(js_hash.shiftRightUnsigned(24).and(0xff).toInt(), 7);
		return key;
	},

	hashkey: function (key) {
		var realkey = Crypt.Hash(key);
		return realkey.toBinary();
	},

	hexencode: function (text) {
		return dcodeIO.ByteBuffer.fromBinary(text).toHex();
	},

	hexdecode: function (hex) {
		return dcodeIO.ByteBuffer.fromHex(hex).toBinary();
	},

	// Constants are the integer part of the sines of integers (in radians) * 2^32.
	k: [
		0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
		0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
		0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
		0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
		0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
		0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
		0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
		0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
		0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
		0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
		0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
		0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
		0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
		0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
		0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
		0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
	],

	// r specifies the per-round shift amounts
	r: [ 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
		 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
		 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
		 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
	],

	// leftrotate function definition
	LEFTROTATE: function (x, c) {
		return ((x << c) | (x >>> (32 - c))) & 0xFFFFFFFF;
	},

	// input w, 16 * 4 bytes
	digest_md5: function (w) {
		var f, g, temp;

		var a = 0x67452301;
		var b = 0xefcdab89;
		var c = 0x98badcfe;
		var d = 0x10325476;

		for (var i = 0; i < 64; i++) {
			if (i < 16) {
				f = (b & c) | ((~b) & d);
				g = i;
			} else if (i < 32) {
				f = (d & b) | ((~d) & c);
				g = (5*i + 1) % 16;
			} else if (i < 48) {
				f = b ^ c ^ d;
				g = (3*i + 5) % 16;
			} else {
				f = c ^ (b | (~d));
				g = (7*i) % 16;
			}

			temp = d;
			d = c;
			c = b;
			b = b + Crypt.LEFTROTATE((a + f + Crypt.k[i] + w.readUint32(g * 4)), Crypt.r[i]);
			b = dcodeIO.Long.fromInt(b).toUnsigned().toInt();
			a = temp;
		}

		var result = dcodeIO.ByteBuffer.allocate(4 * 4);
		result.writeUint32(a, 0 * 4);
		result.writeUint32(b, 1 * 4);
		result.writeUint32(c, 2 * 4);
		result.writeUint32(d, 3 * 4);
		return result;
	},

	// hmac64 use md5 algorithm without padding, and the result is (c^d .. a^b)
	// input char[8] x, char[8] y, return char[8] result
	hmac: function (x, y) {
		var xx = dcodeIO.ByteBuffer.fromBinary(x, true);
		var yy = dcodeIO.ByteBuffer.fromBinary(y, true);
		var w = dcodeIO.ByteBuffer.allocate(4 * 16);
		for (var i=0;i<16;i+=4) {
			w.writeUint32(xx.readUint32(1 * 4), i * 4);
			w.writeUint32(xx.readUint32(0 * 4), (i + 1) * 4);
			w.writeUint32(yy.readUint32(1 * 4), (i + 2) * 4);
			w.writeUint32(yy.readUint32(0 * 4), (i + 3) * 4);
		}

		var r = Crypt.digest_md5(w);

		var result = dcodeIO.ByteBuffer.allocate(4 * 2, true);
		var v = r.readUint32(2 * 4) ^ r.readUint32(3 * 4);
		result.writeUint32(dcodeIO.Long.fromInt(v).toUnsigned().toInt(), 0);
		v = r.readUint32(0 * 4) ^ r.readUint32(1 * 4);
		result.writeUint32(dcodeIO.Long.fromInt(v).toUnsigned().toInt(), 4);
		return result;
	},

	hmac_md5: function (x, y) {
		var xx = dcodeIO.ByteBuffer.fromBinary(x, true);
		var yy = dcodeIO.ByteBuffer.fromBinary(y, true);
		var w = dcodeIO.ByteBuffer.allocate(16 * 4);
		for (var i=0; i<12; i+=4) {
			w.writeUint32(xx.readUint32(0 * 4), i * 4);
			w.writeUint32(xx.readUint32(1 * 4), (i + 1) * 4);
			w.writeUint32(yy.readUint32(0 * 4), (i + 2) * 4);
			w.writeUint32(yy.readUint32(1 * 4), (i + 3) * 4);
		}

		w.writeUint32(0x80, 12 * 4);
		w.writeUint32(0, 	13 * 4);
		w.writeUint32(384, 	14 * 4);
		w.writeUint32(0, 	15 * 4);

		var r = Crypt.digest_md5(w);

		var result = dcodeIO.ByteBuffer.allocate(2 * 4, true);
		var v = (r.readUint32(0 * 4) + 0x67452301) ^ (r.readUint32(2 * 4) + 0x98badcfe);
		result.writeUint32(dcodeIO.Long.fromInt(v).toUnsigned().toInt(), 0);
		v = (r.readUint32(1 * 4) + 0xefcdab89) ^ (r.readUint32(3 * 4) + 0x10325476);
		result.writeUint32(dcodeIO.Long.fromInt(v).toUnsigned().toInt(), 4);
		return result;
	},

	// input, char[8] x, char[8] y
	hmac64: function (x, y) {
		var result = Crypt.hmac(x,y);
		return result.toBinary();
	},

	/*
	  h1 = crypt.hmac64_md5(a,b)
	  m = md5.sum((a..b):rep(3))
	  h2 = crypt.xor_str(m:sub(1,8), m:sub(9,16))
	  assert(h1 == h2)
	 */
	// input: char[8] x, char[8] y
	hmac64_md5: function (x, y) {
		var result = Crypt.hmac_md5(x, y);
		return result.toBinary();
	},

	/*
		8bytes key
		string text
	 */
	hmac_hash: function (key, text) {
		var h = Crypt.Hash(text);
		var result = Crypt.hmac(h.toBinary(), key);
		return result.toBinary();
	},

	// powmodp64 for DH-key exchange

	// The biggest 64bit prime
	P: new dcodeIO.Long(0xffffffc5, 0xffffffff, true),

	// Long a, Long b
	mul_mod_p: function (a, b) {
		var m = dcodeIO.Long.fromInt(0).toUnsigned();
		while (!b.isZero()) {
			if (b.isOdd()) {
				var t = Crypt.P.subtract(a);
				if ( m.greaterThanOrEqual(t)) {
					m = m.subtract(t);
				} else {
					m = m.add(a);
				}
			}
			if (a.greaterThanOrEqual(Crypt.P.subtract(a))) {
				a = a.multiply(2).subtract(Crypt.P);
			} else {
				a = a.multiply(2);
			}
			b = b.shiftRightUnsigned(1);
		}
		return m;
	},

	// Long a, Long b
	pow_mod_p: function (a, b) {
		if (b.equals(1)) {
			return a;
		}
		var t = Crypt.pow_mod_p(a, b.shiftRightUnsigned(1));
		t = Crypt.mul_mod_p(t, t);
		if (b.isOdd()) {
			t = Crypt.mul_mod_p(t, a);
		}
		return t;
	},

	// calc a^b % p
	// Long a, Long b
	powmodp: function (a, b) {
		if (Crypt.P.lessThan(a)) {
			a = a.mod(Crypt.P);
		}
		return Crypt.pow_mod_p(a, b);
	},

	dhsecret: function (x, y) {
		var xx = dcodeIO.ByteBuffer.fromBinary(x, true).readUint64(0);
		var yy = dcodeIO.ByteBuffer.fromBinary(y, true).readUint64(0);
		if (xx.equals(0) || yy.equals(0)) {
			window.alert("Can't be 0");
			console.trace();
			return;
		}

		var r = Crypt.powmodp(xx, yy);
		return dcodeIO.ByteBuffer.wrap(r.toBytes(true)).toBinary();
	},

	dhexchange: function (x) {
		var x64 = dcodeIO.ByteBuffer.fromBinary(x, true).readUint64(0);
		if (x64.isZero()) {
			window.alert("Can't be 0");
			console.trace();
			return;
		}

		var r = Crypt.powmodp(dcodeIO.Long.fromInt(5).toUnsigned(), x64);
		return dcodeIO.ByteBuffer.wrap(r.toBytes(true)).toBinary();
	},

	// base64
    base64encode: function (input) {
    	return dcodeIO.ByteBuffer.btoa(input);
    },

    base64decode: function (input) {
    	return dcodeIO.ByteBuffer.atob(input);
    },

	xor_str: function (s1, s2) {
		if (!s2) {
			window.alert("Can't xor empty string");
			console.trace();
			return;
		}

		var len1 = s1.length;
		var len2 = s2.length;
		var b = dcodeIO.ByteBuffer.allocate(len1);
		for (var i=0; i<len1; i++) {
			b.writeByte((s1.charCodeAt(i) ^ s2.charCodeAt(i % len2)) & 0xFF, i);
		}
		return b.toBinary();
	},

};
