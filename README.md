# nodejs 基础总结

## 1.全局对象 __dirname __filename

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