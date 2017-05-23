var FIRST_VALUE = 2;
var LAST_VALUE = 40;
var i;
function check(){
  i = FIRST_VALUE;
  for (i; i < LAST_VALUE; i++){
    var j = 2;
    var prime = true;
    for (j; j<i; j++){
      if (i%j === 0) {
        prime = false;
      }
    }
    if (prime) {
      isPrime(i);
    }
  }
}
function isPrime(i) {
  console.log(i);
}
check();