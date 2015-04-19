const cookieService = {
    set(name, value, hours) {
        let expires = '';
        if (hours > 0) {
            let date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + decode(value) + expires + "; path=/";
    },
    get(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                const value = c.substring(nameEQ.length, c.length);
                return encode(value);
            }
        }
        return null;
    },
    clear(name) {
        this.set(name, "", -1);
    }
};

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

export default cookieService;
