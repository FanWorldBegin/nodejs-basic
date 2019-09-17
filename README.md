# nodejs 基础总结

## 1.全局对象 __dirname __filename
 __filename 文件路径
__dirname  文件夹名
```javascript
console.log(__dirname);
console.log(__filename);

// require exports

var time = 0;

var timer = setInterval(function() {
    time += 2;
    console.log(time + " seconds have passed");
    if (time > 5) {
        clearInterval(timer);
    }
}, 2000);
```

输出
![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/1.png)
