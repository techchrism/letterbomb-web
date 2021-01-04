import CryptoJS from 'crypto-js';

CryptoJS.enc.u8array = {
    /**
     * Converts a word array to a Uint8Array.
     *
     * @param {WordArray} wordArray The word array.
     *
     * @return {Uint8Array} The Uint8Array.
     *
     * @static
     *
     * @example
     *
     *     var u8arr = CryptoJS.enc.u8array.stringify(wordArray);
     */
    stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        
        // Convert
        var u8 = new Uint8Array(sigBytes);
        for (var i = 0; i < sigBytes; i++) {
            var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            u8[i]=byte;
        }
        
        return u8;
    },
    
    /**
     * Converts a Uint8Array to a word array.
     *
     * @param {string} u8Str The Uint8Array.
     *
     * @return {WordArray} The word array.
     *
     * @static
     *
     * @example
     *
     *     var wordArray = CryptoJS.enc.u8array.parse(u8arr);
     */
    parse: function (u8arr) {
        // Shortcut
        var len = u8arr.length;
        
        // Convert
        var words = [];
        for (var i = 0; i < len; i++) {
            words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
        }
        
        return CryptoJS.lib.WordArray.create(words, len);
    }
};

function toHexString(byteArray)
{
    return byteArray.reduce((output, elem) =>
            (output + ('0' + elem.toString(16)).slice(-2)), '');
}

function setBytes(target, from, start, count)
{
    count = typeof count !== 'undefined' ? count : from.length;
    for(let i = 0; i < count; i++)
    {
        target[start + i] = from[i];
    }
}

function getInt64Bytes(x)
{
    let y= Math.floor(x/2**32);
    return [y,(y<<8),(y<<16),(y<<24), x,(x<<8),(x<<16),(x<<24)].map(z=> z>>>24)
}

export default function(template, mac)
{
    const bytes = new Uint8Array(template);
    
    const macBytes = CryptoJS.enc.Hex.parse(mac);
    const key = CryptoJS.SHA1(macBytes.concat(CryptoJS.enc.Utf8.parse('\x75\x79\x79')));
    const keyBytes = CryptoJS.enc.u8array.stringify(key);
    
    setBytes(bytes, keyBytes.slice(0, 8), 8);
    setBytes(bytes, Array.from("\x00".repeat(20)), 176);
    
    const yesterday = new Date();
    const earlier = new Date(2000, 0, 1, 0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    const timestamp = Math.floor((yesterday.getTime() - earlier.getTime()) / 1000);
    
    setBytes(bytes, getInt64Bytes(timestamp).slice(4), 124);
    setBytes(bytes, timestamp.toString().padStart(10, '0').split('').map(c => c.charCodeAt(0)), 128);
    
    const hmac = CryptoJS.HmacSHA1(CryptoJS.enc.u8array.parse(bytes), CryptoJS.enc.u8array.parse(keyBytes.slice(8)));
    const hmacBytes = CryptoJS.enc.u8array.stringify(hmac);
    setBytes(bytes, hmacBytes, 176);
    
    // Generate file path
    const filePath = 'private/wii/title/HAEA/' +
        toHexString(keyBytes.slice(0, 4)).toUpperCase() + '/' +
        toHexString(keyBytes.slice(4, 8)).toUpperCase() + '/' +
        yesterday.getFullYear().toString().padStart(4, '0') + '/' +
        yesterday.getMonth().toString().padStart(2, '0') + '/' +
        yesterday.getDate().toString().padStart(2, '0') + '/' +
        yesterday.getHours().toString().padStart(2, '0') + '/' +
        yesterday.getMinutes().toString().padStart(2, '0') + '/HABA_#1/txt/' +
        timestamp.toString(16).toUpperCase().padStart(8, '0') + '.000';
    
    return {bytes, filePath};
}
