var jQuery = require('jquery-browserify');

var Loader = {
    loadJson(url, done) {
        jQuery.ajax({
            url: url,
            dataType: 'json',
        })
        .done(done);
    }
};

module.exports = Loader;