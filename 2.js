//求知99 nodejs 基础
console.log(__dirname);
console.log(__filename);

// require exports

var time = 0;

var timer = setInterval(function () {
  time += 2;
  console.log(time + " seconds have passed");
  if (time > 5) {
    clearInterval(timer);
  }
}, 2000);