const MIN_VALUE_OF_RANGE = 1;
const MAX_VALUE_OF_RANGE = 16;
function printPrimeFromRange(min, max) {
  for (let i = min; i < max; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}
function isPrime(i) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      return false;
    }
  }
  return true;
}
printPrimeFromRange(MIN_VALUE_OF_RANGE, MAX_VALUE_OF_RANGE);