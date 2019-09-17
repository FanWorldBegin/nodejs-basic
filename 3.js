function callFunction(fun, name) {
  fun(name);
}


var sayBye = function(name) {
  console.log('hi')
}
callFunction(function (name) {
  console.log(name + ' Bye');
}, 'rails365');