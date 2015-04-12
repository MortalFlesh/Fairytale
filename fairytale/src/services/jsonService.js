import jQuery from 'jquery-browserify';

var jsonService = {
    extendsJson(json, extension) {
        return jQuery.extend(true, {}, json, extension);
    },
};

module.exports = jsonService;