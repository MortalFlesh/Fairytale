import jQuery from 'jquery-browserify';

const jsonService = {
    extendsJson(json, extension) {
        return jQuery.extend(true, {}, json, extension);
    },
};

export default jsonService;