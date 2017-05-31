const MIN_VALUE_OF_RANGE = 1;
const MAX_VALUE_OF_RANGE = 10;
function printEven(min, max) {
  let i = min;
  if (i % 2 !== 0) {
    i += 1;
  }
  for (i; i <= max; i += 2) {
    console.log(i);
  }
}
printEven(MIN_VALUE_OF_RANGE, MAX_VALUE_OF_RANGE);