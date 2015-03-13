var jQuery = require('jquery-browserify');

var Loader = {
    loadBook(url, done) {
        jQuery.ajax({
            url: url,
            dataType: 'json',
        })
        .done(done);
    }
};

module.exports = Loader;