module.exports = {  
    plugins: {  
        'autoprefixer': {
            browsers: [
                'last 5 versions', 
                'last 5 Chrome versions',
                'Firefox >= 17',
                'ie >= 8',
                'iOS >= 8', 
                'Android >= 4'
            ]
        }  
    }  
    // plugins: [
    //     require('autoprefixer')({ /* ...options */ })
    // ]
};
