const minValueOfRange = 2;
const maxValueOfRange = 10;
function printPrimeFromRange(min, max) {
  var i = min;
  for (i; i < max; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}
function isPrime(i) {
  var j = 2;
  for (j; j < i; j++) {
    if (i % j === 0) {
      return false;
    }
    return true;
  }
}
printPrimeFromRange(minValueOfRange, maxValueOfRange);