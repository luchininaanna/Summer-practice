const MIN_VALUE_OF_RANGE = -10;
const MAX_VALUE_OF_RANGE = 100;
function printPrimeFromRange(min, max) {
  for (let i = min; i < max; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}
function isPrime(i) {
  if (i > 1) {
    for (let j = 2; j < (i - (i % 2)) / 2; j++) {
      if (i % j === 0) {
        return false;
      }
    }
    return true;
  }
}
printPrimeFromRange(MIN_VALUE_OF_RANGE, MAX_VALUE_OF_RANGE);