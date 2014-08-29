({
    appDir: "./",
    baseUrl: "JS",     //js文件的跟目录
    dir: "JSbuild",      //合并压缩后的输出目录,会把项目所有文件都输出到这里
    removeCombined: true,   //删除输出目录之前的合并文件
    paths: {
        'jquery': 'Scripts/jquery-1.9.1.min'      //定义jquery文件模块
    },
    modules: [{
        name: 'main',                                       //这里写明要压缩的js文件，该文件中依赖的其他js文件会自动关联进来
        exclude: ['jquery']                                  //main.js中用到了jquery文件，但是不想压缩jquery的话，采用该exclude属性来排除
    }]
})