
var Base64 = (function () {

    var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  
    var Base64 = function () {};
  
    var _encode = function (value) {
  
        if (typeof(value) !== 'number') {
            throw 'Value is not number!';
        }
  
        var result = '', mod;
        do {
            mod = value % 64;
            result = ALPHA.charAt(mod) + result;
            value = Math.floor(value / 64);
        } while(value > 0);
  
        return result;
    };
  
    var _decode = function (value) {
  
        var result = 0;
        for (var i = 0, len = value.length; i < len; i++) {
            result *= 64;
            result += ALPHA.indexOf(value[i]);
        }
  
        return result;
    };
  
    Base64.prototype = {
        constructor: Base64,
        encode: _encode,
        decode: _decode
    };
  
    return Base64;
  
  })();


/** untuk custom alert */
function customAlert(title, header) {
    return myApp.alert(title, [header]);
}
  
/** untuk validate email */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateNumber(value) {
    var re = /^[0-9]+$/;
    return re.test(value);
}

function blink(selector){
    $(selector).fadeOut('slow', function(){
        $(this).fadeIn('slow', function(){
            blink(this);
        });
    });
}
  