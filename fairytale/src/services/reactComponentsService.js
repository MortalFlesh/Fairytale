const reactComponentsService = {
    join(components, separator) {
        const componentsLength = components.length;
        const lastItemIndex = componentsLength - 1;
        let joined = [];

        for (let i in components) {
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