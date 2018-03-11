//Error Handling
const plumber = require('gulp-plumber'),
notify = require('gulp-notify');
//Customizes how the error messages pop-up
module.exports = {
    
    customPlumber: function (errTitle) {
        return plumber({
            errorHandler: notify.onError({
                // Customizing error title
                title: errTitle || 'Error running Gulp',
                message: 'Error: <%= error.message %>',
                sound: true,
            })
        });
    }
}