## 图片预加载——显示加载进度

### usage

```js
/**
@param imageArr:预先加载的图片数组,
@param config:
  @param update:每加载一张执行一次update函数
  @param complete:加载完成所有图片执行该函数
  @param silent:true//表示使用默认的加载样式
*/
ImageLoader(imageArr,config)
```


```html
<!DOCTYPE html>
<html ng-app="app">
  <head>
    <title>imageloader</title>
    <script type="text/javascript" src="../imageloader.js"></script>
    <link rel="stylesheet" type="text/css" href="../imageloader.css">
  </head>
  <body>
    <h2 style="text-align:center">imageloader demo</h2>
    <div id="imageContainer"></div>
    <script type="text/javascript">
      var imagesArr = ['./images/buy_domain.png','./images/dusk.jpg','./images/malaysia_dusk.jpg','./images/malaysia_sea.jpg'];
      var updateFn = function(){
        var img = document.createElement('IMG');
        img.setAttribute('src',arguments[2]);
        document.getElementById('imageContainer').appendChild(img);
      }
      ImageLoader(imagesArr,{update:updateFn,complete:function(){
        alert('All images loaded.');
      },silent:true});
    </script>
  </body>
</html>
```