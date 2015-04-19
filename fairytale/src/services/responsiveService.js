const ResponsiveService = {
    getHeight(maxHeight) {
        const screenHeight = 1200;

        return screenHeight > maxHeight ? maxHeight : screenHeight;
    },
    getWidth(maxWidth) {
        const screenWidth = 1920;
        
        return screenWidth > maxWidth ? maxWidth : screenWidth;
    },
};

export default ResponsiveService;