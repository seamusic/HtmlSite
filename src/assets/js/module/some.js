
//例子：如何调用模块中扩展的方法；
define(["jquery", "main"], function (require, exports, module) {
    var main = require("main");
    console.log(main.foo);
});