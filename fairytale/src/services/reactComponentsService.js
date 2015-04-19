var reactComponentsService = {
    join(components, separator) {
        var componentsLength = components.length;
        var lastItemIndex = componentsLength - 1;
        var joined = [];

        for (var i in components) {
            joined.push(components[i]);

            if (i < lastItemIndex) {
                if (separator instanceof Function) {
                    joined.push(separator(componentsLength + i));
                } else {
                    joined.push(separator);
                }
            }
        }

        return joined;
    },
};

export default reactComponentsService;