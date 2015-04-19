var ResponsiveService = {
    getHeight(maxHeight) {
        var screenHeight = 1200;

        return screenHeight > maxHeight ? maxHeight : screenHeight;
    },
    getWidth(maxWidth) {
        var screenWidth = 1920;
        
        return screenWidth > maxWidth ? maxWidth : screenWidth;
    },
};

export default ResponsiveService;