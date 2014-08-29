;
//动态根据页面加载zepto还是jquery
if (typeof define === "function" && define.amd) {
    define("$", [], function () {
        var mobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
        //加载其它JS
        //根据当前运行的环境加载jquery还是zepto
        var cdnStaticfileJquery = mobile ? "//cdn.staticfile.org/zepto/1.1.3/zepto.min.js" : '//cdn.staticfile.org/jquery/2.1.1/jquery.min.js';
        var localStaticfileJquery = mobile ? 'libs/zepto_1.1.3.js' : 'libs/jquery-1.11.1.min.js';
        yepnope([
        {
            test: !window.$,
            yep: cdnStaticfileJquery,
            nope: "",
            complete: function () {
                if (!window.$) {
                    console.log("saas: CDN $加载不成功，开始加载本地库");
                    yepnope([
                        {
                            load: localStaticfileJquery,
                            complete: function () {
                                if (!window.$) {
                                    console.log("saas: $加载本地库失败");
                                } else {
                                    console.log('saas: CDN $加载失败，加载本地库成功');
                                }
                            }
                        }
                    ]);
                } else {
                    console.log('saas: CDN 加载成功或页面已经存在$');
                }
            }
        }]);
    });
};
//全局配置
requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        app: '../module',
        page: "pages",
    },
    shim: {
        "utility": {
            deps: ["$", "common"],
        },
        'underscore': {
            exports: '_'
        },
    }
});
var webApp;

//如果名字和文件名一样，可以忽略
define("main", ["utility"], function (utility) {
    //Loaded
    console.log('saas: 主要JS加载成功');
    //Ready
    console.log('saas: DOM Ready');
    //Load Secondary Assets & Add Functionalty
    //Assets that don't need to be immediately loaded and/or executed
    webApp = utility;
    webApp.init({
        iOsOrientationChangeFix: true,
        placeholderFallBack: true,
        customInput: true,
        simpleModals: true,
        jQueryFormValidation: true
    });
    //
    var pageJs = "pages/" + webApp.fileName;
    console.log('pagejs：' + pageJs);
    //加载当前而对应的JS
    if (webApp.fileName !== "" && require.specified(pageJs)) {
        require([pageJs], function () {
            console.log(webApp.fileName + "loaded;");
        });
    }

    console.log("main loaded.");
    return {
        foo: 'bar',
        doSomething: function () { }
    };
});