;(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define('ImageLoader', [], function ($) {
      return (root.ImageLoader = factory($));
    });
  } else {
    root.ImageLoader = factory();
  }
}(this, function() {
    function noop(){}
    //图片预先加载
    function preLoad(imgArr,updatecb,endcb){
        updatecb = updatecb || noop;
        endcb = endcb || noop;
        var count = 0;
        for(var i = 0 , len = imgArr.length ; i < len; i++){
            loadImg(imgArr[i],function(){  
                ++count
                updatecb(count,len);        
                if(count === len){
                    endcb();
                }
            })
        }
    }
    //加载单张图片
    function loadImg(src,cb){
        var imgObj = new Image();
        imgObj.onerror = imgObj.onload = cb;
        imgObj.src = src;
        imgObj = null;
    }
    //加载单张图片的回调
    function updateLoadingCb(count,len){
        document.getElementById('loadPercent').innerHTML = ((count/len)*100).toFixed(2);
        document.getElementById('inlineBg').style.width = 240*count/len+'px';
    }
    ImageLoader.preLoad = preLoad;
    ImageLoader.loadImg = loadImg;
    ImageLoader.version = '0.0.1';
    return ImageLoader;
}));
