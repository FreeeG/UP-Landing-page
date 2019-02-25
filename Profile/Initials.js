(function(w, d){
    function LetterAvatar (name, size) {
        name  = name || '';
        size  = size || 60;
        var colours = [
                "#386692", "#1B998B", "#4D9DE0", "#E15554", "#E1BC29"
            ],
            nameSplit = String(name).toUpperCase().split(' '),
            initials, charIndex, colourIndex, canvas, context, dataURI;
        if (nameSplit.length == 1) {
            initials = nameSplit[0] ? nameSplit[0].charAt(0):'?';
        } else {
            initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        }
        if (w.devicePixelRatio) {
            size = (size * w.devicePixelRatio);
        }       
        charIndex     = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
        colourIndex   = charIndex % colours.length;
        canvas        = d.createElement('canvas');
        canvas.width  = size;
        canvas.height = size;
        context       = canvas.getContext("2d");     
        context.fillStyle = colours[colourIndex - 1];
        context.fillRect (0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width/2)+"px Arial";
        context.textAlign = "center";
        context.fillStyle = "#FFF";
        context.fillText(initials, size / 2, size / 1.5);
        dataURI = canvas.toDataURL();
        canvas  = null;
        return dataURI;
    }

    LetterAvatar.transform = function() {
        Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
            name = img.getAttribute('avatar');
            img.src = LetterAvatar(name, img.getAttribute('width'));
            img.removeAttribute('avatar');
            img.setAttribute('alt', name);
        });
    };

    if (typeof define === 'function' && define.amd) {
        define(function () { return LetterAvatar; });
    } else if (typeof exports !== 'undefined') {
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = LetterAvatar;
        }
        exports.LetterAvatar = LetterAvatar;
    } else {
        window.LetterAvatar = LetterAvatar;
        d.addEventListener('DOMContentLoaded', function(event) {
            LetterAvatar.transform();
        });
    }
})(window, document);