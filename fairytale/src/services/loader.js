import jQuery from 'jquery-browserify';

const Loader = {
    loadJson(url, done) {
        this.loadJsonWithData(url, {}, done);
    },
    loadJsonWithData(url, data, done) {
        jQuery.ajax({
            method: 'POST',
            url: url,
            data: data,
            dataType: 'json',
        })
        .done(done);
    },
};

export default Loader;