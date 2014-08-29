var saasApp = function () {
    this.location = window.location,
        this.path = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1),
        this.fileName = location.pathname === "/" ? "index" : location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.lastIndexOf('.')),
        this.query = window.location.search.substr(1),
        this.isTouch = ('ontouchstart' in document.documentElement),
        this.isiPhone = ((navigator.userAgent.indexOf('iPhone') !== -1) || (navigator.userAgent.indexOf('iPod') !== -1)),
        this.isiPad = navigator.userAgent.match(/iPad/i) !== null;
};

saasApp.prototype.cache = {
    window: $(window),
    document: $(document),
    html: $('html'),
    body: $('body'),
    title: document.title,
    global: global
};

saasApp.prototype.assets = function (obj) {
    var iOsOrientationChangeFix = obj.iOsOrientationChangeFix || false,
        placeholderFallBack = obj.placeholderFallBack || false,
        customInput = obj.customInput || false,
        simpleModals = obj.simpleModals || false,
        jQueryFormValidation = obj.jQueryFormValidation || false;

    if (iOsOrientationChangeFix) {
        if (saasApp.isiPhone || saasApp.isiPad) {
            yepnope([
                {
                    load: [
                        'assets/js/ios-orientationchange-fix.js'
                    ],
                    complete: function () {
                        console.log('saas: Orientation Fix Loaded');
                    }
                }
            ]);
        }
    }
    if (placeholderFallBack) {
        if ($('[placeholder]').length) {
            yepnope([
                {
                    load: [
                        'assets/js/vendor/jquery.placeholder.min.js'
                    ],
                    complete: function () {
                        $('input[placeholder], textarea[placeholder]').placeholder();
                    }
                }
            ]);

        }
    }
    if (customInput) {
        if (this.cache.document.find('.replace-input').length) {
            var replaceInput = this.cache.document.find('.replace-input');
            yepnope([
                {
                    load: [
                        'assets/js/jquery.customInput.js'
                    ],
                    complete: function () {
                        replaceInput.customInput();
                    }
                }
            ]);
        }
    }
    if (simpleModals) {
        yepnope([
            {
                load: [
                    'assets/js/modal.js'
                ],
                complete: function () {
                    saasModal.init();
                }
            }
        ]);
    }
    if (jQueryFormValidation) {
        if (this.cache.document.find('.form-validation').length) {
            yepnope([
                {
                    load: [
                        'assets/js/vendor/jquery.validate.min.js'
                    ],
                    complete: function () {
                        yepnope([
                            {
                                load: [
                                    'assets/js/validation.js'
                                ],
                                complete: function () {
                                    formValidation();
                                }
                            }
                        ]);
                    }
                }
            ]);
        }
    }

};

saasApp.prototype.extend = function () {
    if ($.fn.extend) {
        $.fn.extend({
            _animate: $.fn.animate,
            animate: function (prop, speed, callback, easing) {
                return this.is(':animated') || this._animate(prop, speed, callback, easing);
            }
        });
    }
};

saasApp.prototype.utility = function () {
    //Feature detection is better, but some good plugins use $.browser
    $.browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());


    //Smooth Scroll
    $.fn.smoothScroll = function () {
        $('html, body').animate({
            scrollTop: ($(this).offset().top - 70) + 'px'
        }, {
            duration: 250,
            easing: 'swing'
        });
    };
};

saasApp.prototype.events = function (obj) {

    var $elCache = obj,
        $window = $elCache.window,
        $document = $elCache.document,
        $html = $elCache.html,
        $body = $elCache.body;

    $document.find('.scroll-to').on('click', function () {
        var scrollDestination = $(this).attr('href');
        $(scrollDestination).smoothScroll();
        return false;
    });

    $document.find('.print').on('click', function () {
        window.print();
        return false;
    });

};

saasApp.prototype.init = function (obj) {
    console.log('saas: 开始初始化');
    console.log('saas: 属性：' + this.cache.html.attr('class'));
    console.log('saas: 本地：' + this.location);
    console.log('saas: 路径：' + this.path);
    this.assets(obj);
    this.extend();
    this.utility();
    this.events(this.cache);
};

//支持amd动态加载
if (typeof define === "function" && define.amd) {
    define("utility", ["common"], function () { return new saasApp; });
}
