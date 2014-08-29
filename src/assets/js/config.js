requirejs.config({
    // 要使用 shim 来配置没有实现 AMD 规范的模块
    // 不过注意 shim 不能用来配置已经实现 AMD 规范的模块
    shim : {
        'backbone' : {
            //定义依赖，会在 backbone.js 载入前载入这些依赖
            deps : ['underscore', 'jquery'],
            //导出 Backbone
            exports : 'Backbone'
        },
        'underscore' : {
            exports : '_'
        }
    }
});

//jQuery 
requirejs.config({
    shim : {
        'jquery.colorize' : {
            deps : ['jquery'],
            exports : 'jQuery.fn.colorize'
        },
        'jquery.scroll' : {
            deps : ['jquery'],
            exports : 'jQuery.fn.scroll'
        }
    }
});