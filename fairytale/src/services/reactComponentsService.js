var reactComponentsService = {
    join(components, separator) {
        var lastItemIndex = components.length - 1;
        var joinedComponent = [];

        for (var i in components) {
            joinedComponent.push(components[i]);

            if (i < lastItemIndex) {
                joinedComponent.push(separator);
            }
        }

        return joinedComponent;
    }
};

module.exports = reactComponentsService;