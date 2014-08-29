//Console.log Fallback
if (!window.console) {
    window.console = function () {
        this.log = function (str) { };
        this.dir = function (str) { };
    };
}
//-------------------------------------------以下为系统全局变量-------------------------------------------
var global = {
    domain: "",
    baseurl: "",
    version: [
        {
            ver: "V2.1",
            date: "2014-08-19",
            desc: "",
            list: ["更新内容"]
        }
    ],
    dict: {

    }
};

//-------------------------------------------以下为通用函数-------------------------------------------
//从dom中读取值变为json对象
function stringToJson(id) {
    var $elt = $(id);
    if ($elt.length > 0) {
        var val = $elt.val();
        try {
            return $.parseJSON(val);
        } catch (e) {
        }
    }
    return null;
}

//直接将字符串转换为json
function transformToJson(val) {
    try {
        return $.parseJSON(val);
    } catch (e) {
    }
    return null;
}

//清除字符串
function clearString(s) {
    var pattern = new RegExp("[`~!#$^&*=':;,.?]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

//计算字符串长度，中文算2个
function countCharacters(str) {
    var totalCount = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            totalCount++;
        } else {
            totalCount += 2;
        }
    }
    return totalCount;
}

//获取正确的视图
var getViewPort = function() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
};

//滚动至
function scrollToY(pos) {
    var to = pos || 0,
        y = document.body.scrollTop || document.documentElement.scrollTop,
        delay = 200,
        perMinus = (to - y) / delay,
        t = 0;
    (function(posy) {
        var caller = arguments.callee,
            startY = posy + perMinus * 5;
        window.scrollTo(0, startY);
        if (Math.abs(startY - to) < 5) {
            caller = null;
        } else {
            setTimeout(function() {
                caller(startY);
            }, 5);
        }
    }(y));
}

//滚动至节点
function scrollToNode(nodeId) {
    var tar = document.getElementById(nodeId);
    var top = tar.offsetTop,
        parent = tar.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    scrollToY(top);
}

//初始化下拉框，使下拉选择框在页面显示为一个label
//CSS begin
//.drop-select{
//  display: inline-block;
//  position: relative;
//  text-align: center;
//  height: 32px;
//  margin: 0px;
//}
//.drop-select select{
//  position: absolute;
//  top: 0;
//  left: 0;
//  width:100%;
//  height:32px;
//  z-index: 100;
//  opacity: 0;
//}
//CSS end
//example begin
//<div class="drop-select" style="text-align: left">
//  <label class="infoLabel">请选择</label>
//  <input type="hidden" id="integratedUnit" name="integratedUnit" />
//  <select class="dropdown-select" id="integrated" name="integrated">
//      <option value="xt">选择1</option>
//      <option value="jp">选择2</option>
//  </select><span class="caret"></span>
//</div>
//example end
function initSelect(callback) {
    var $elt = $(".drop-select");
    $elt.each(function(i) {
        initSingleSelect($(this), callback);
    });
}

function initSingleSelect($elt, callback) {
    if ($elt == undefined || $elt.length == 0) {
        return;
    }

    var textElt = $elt.data("textelt") || "label";
    var selectElt = $elt.data("selectelt") || "select";
    var hiddenElt = $elt.data("hiddenelt") || "input[type=hidden]";
    var $label = $elt.find(textElt);
    var $text = $elt.find(hiddenElt);
    var $select = $elt.find(selectElt);
    $select.on("change", function() {
        var selectValue = $select.val();
        var selectText = $select.find("option").not(function() {
            return !this.selected;
        }).text();
        $label.text(selectText);
        $text.val(selectText);
        if ($.isFunction(callback)) {
            callback(selectValue, selectText);
        }
    });

}

//获取随机字符串
function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//获取min和max之间的随机数
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//获取min和max之间的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var generateGUID =
    (typeof (window.crypto) != 'undefined' && typeof (window.crypto.getRandomValues) != 'undefined')
        ? function() {
            var buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            var s4 = function(num) {
                var ret = num.toString(16);
                while (ret.length < 4) {
                    ret = "0" + ret;
                }
                return ret;
            };
            return (s4(buf[0]) + s4(buf[1]) + "-" + s4(buf[2]) + "-" + s4(buf[3]) + "-" + s4(buf[4]) + "-" + s4(buf[5]) + s4(buf[6]) + s4(buf[7]));
        }
        : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

