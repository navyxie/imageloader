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
    var doc = document;
    var isReady = false;
    var readyCbList = [];
    function _domContentLoadedFn(){
        isReady = true;
        doc.removeEventListener('DOMContentLoaded',_domContentLoadedFn,false);        
        var fireFn;
        while(fireFn = readyCbList.shift()){
            fireFn();
        }
    }
    _ready = function(cb){
        if(isReady || doc.readyState === "complete"){
            return cb();
        }
        readyCbList.push(cb);
        doc.addEventListener('DOMContentLoaded',_domContentLoadedFn,false);
    }
    function noop(){}
     
    function isObject(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    function isFunction(fn){
        return Object.prototype.toString.call(fn) === '[object Function]';
    }
    function _createElement(tagName,attrs){
        if(isObject(tagName)){
            attrs = tagName;
            tagName = 'DIV';
        }
        var dom = doc.createElement(tagName);
        if(isObject(attrs)){
            for(var key in attrs){
                if(attrs.hasOwnProperty(key)){
                    if(key === 'className'){
                        dom.setAttribute('class',attrs[key])
                    }else{
                        dom.setAttribute(key,attrs[key])
                    }                  
                }
            }
        }
        return dom;
    }
    function _createTextNode(str){
        return doc.createTextNode(str);
    }
    function _appendChild(parentDom,subDom){
        parentDom.appendChild(subDom);
        return parentDom;
    } 
    function _initDom(){
        var body =  doc.getElementsByTagName('body')[0];
        var df = doc.createDocumentFragment();
        var container = _createElement({id:'imageLoaderMaskContainer',className:'imageLoaderMaskContainer'});
        var content = _createElement({className:'loadingContent'});
        var imageLoaderIn = _createElement({id:'imageLoaderIn',className:'imageLoaderIn'});
        var textContent = _createElement({className:'textContent'});
        var span = _createElement('SPAN',{id:'loadPercent'});
        var text = _createTextNode('%');
        _appendChild(textContent,span);
        _appendChild(textContent,text);
        _appendChild(content,imageLoaderIn);
        _appendChild(content,textContent);
        _appendChild(container,content);
        _appendChild(df,container);
        _appendChild(body,df);
    }
    function _removeDom(){
        doc.getElementsByTagName('body')[0].removeChild(doc.getElementById('imageLoaderMaskContainer'));
    }
    //图片预先加载
    function preLoad(imgArr,config){
        var endcb = noop;
        var cleanfn = _removeDom
        var initfn = _initDom;
        var updatecb = _updateLoadingCb;
        if(isFunction(config)){
            endcb = function(){
                _removeDom();
                config();
            }
        }else if(isObject(config)){
            if(isFunction(config.complete)){
                endcb = config.complete;
            }
            if(isFunction(config.update)){
                if(config.silent){
                    updatecb = function(count,len,url){
                        _updateLoadingCb(count,len,url);
                        config.update(count,len,url);
                    }
                }else{
                    initfn = cleanfn = noop;
                    updatecb = config.update;
                }
            }
        }
        _ready(function(){
            initfn();
            var count = 0;
            for(var i = 0 , len = imgArr.length ; i < len; i++){
                _loadImg(imgArr[i],function(url){  
                    ++count
                    updatecb(count,len,url);        
                    if(count === len){ 
                        cleanfn();                       
                        endcb();
                    }
                })
            }
        });
    }
    //加载单张图片
    function _loadImg(src,cb){
        var imgObj = new Image();
        imgObj.onerror = imgObj.onload = function(){cb(src)};
        imgObj.src = src;
        imgObj = null;
    }
    //加载单张图片的回调
    function _updateLoadingCb(count,len){
        console.log(1);
        var loadTextWidth =  doc.getElementById('imageLoaderMaskContainer').children[0].offsetWidth;
        doc.getElementById('loadPercent').innerHTML = ((count/len)*100).toFixed(2);
        doc.getElementById('imageLoaderIn').style.width = loadTextWidth*count/len+'px';
    }
    return preLoad;
}));
