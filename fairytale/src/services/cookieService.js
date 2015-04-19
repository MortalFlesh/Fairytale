function decode(value) {
    if (value instanceof Object) {
        return JSON.stringify(value);
    }

    return value;
}

function encode(value) {
    try {
        return JSON.parse(value);
    } catch(Error) {
        return value;
    }
}

var cookieService = {
    set(name, value, hours) {
        var expires = '';
        if (hours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + decode(value) + expires + "; path=/";
    },
    get(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                var value = c.substring(nameEQ.length, c.length);
                return encode(value);
            }
        }
        return null;
    },
    clear(name) {
        this.set(name, "", -1);
    }
};

export default cookieService;
