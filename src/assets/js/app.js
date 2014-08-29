(function() {
    //Strict within entire scope
    'use strict';
    //App
    var WebApp;
    yepnope([
        {
            load: [
                'assets/js/common.js',
                'assets/js/libs/jquery.metadata.js',
                'assets/js/utility.js',
                'assets/js/tabs.js'
            ],
            complete: function() {
                //Loaded
                console.log('saas: 主要JS加载成功');
                //Ready
                $(function() {
                    console.log('saas: DOM Ready');
                    //Load Secondary Assets & Add Functionalty
                    //Assets that don't need to be immediately loaded and/or executed
                    WebApp = new saasApp;
                    WebApp.init({
                        iOsOrientationChangeFix: true,
                        placeholderFallBack: true,
                        customInput: true,
                        simpleModals: true,
                        jQueryFormValidation: true
                    });

                    (function () {
                        var pageJs = "assets/js/pages/" + WebApp.fileName + ".js";
                        console.log('pagejs' + pageJs);
                        if (WebApp.fileName !== "") {
                            yepnope([
                                {
                                    load: [
                                        pageJs
                                    ],
                                    complete: function() {
                                        console.log('saas: Page JS Loaded');
                                    }
                                }
                            ]);
                        }
                    }());
                });
            }
        }
    ]);
})();