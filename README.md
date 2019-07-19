# Crypt.js
A javascript version for skynet's lua-crypt.c

"""

    var hex1 = "539708b1180d6572";
    var hex2 = "5cd3c065272d874a";
    var text = "Hello, World!";
    var code = Crypt.hashkey(text);
    console.log("hashkey for", text, "is", Crypt.hexencode(code));

    code = Crypt.desencode(Crypt.hexdecode(hex1), text);
    var orig = Crypt.desdecode(Crypt.hexdecode(hex1), code);
    console.log("desencode for", text, "is", Crypt.hexencode(code), "restore to", orig);

    code = Crypt.hmac64(Crypt.hexdecode(hex1), Crypt.hexdecode(hex2));
    console.log("hmac64 for", hex1, ",", hex2, "is", Crypt.hexencode(code));

    code = Crypt.hmac_hash(Crypt.hexdecode(hex1), text);
    console.log("hmac_hash for", hex1, text, "is", Crypt.hexencode(code));

    code = Crypt.xor_str(hex1, text);
    console.log("xor_str for", hex1, ",", text, "is", Crypt.hexencode(code));

    code = Crypt.dhexchange(Crypt.hexdecode(hex1));
    console.log("dhexchange key for ", hex1, "is", Crypt.hexencode(code));

    code = Crypt.dhsecret(Crypt.hexdecode(hex1), Crypt.hexdecode(hex2));
    console.log("dhsecret key for ", hex1, ",", hex2, "is", Crypt.hexencode(code));

"""

shows

"""

    hashkey for Hello, World! is 8e82e296b1dfec8b test.html:100:5
    desencode for Hello, World! is a325015e462a994ad8b185b30dbf08b4 restore to Hello, World! test.html:104:5
    hmac64 for 539708b1180d6572 , 5cd3c065272d874a is c7747c8b910389cc test.html:107:5
    hmac_hash for 539708b1180d6572 Hello, World! is b1fb6aea91ecc1f2 test.html:110:5
    xor_str for 539708b1180d6572 , Hello, World! is 7d56555b5f1442665e4a5c00177d525e test.html:113:5
    dhexchange key for  539708b1180d6572 is 6e53bf06eabd8aca test.html:116:5
    dhsecret key for  539708b1180d6572 , 5cd3c065272d874a is 0a3ff75741c931fa
"""

# websocket.lua
 位置是skynet的lualib/http/websocket.lua

