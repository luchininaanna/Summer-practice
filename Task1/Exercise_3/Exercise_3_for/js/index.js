const minValueOfRange = 2;
const maxValueOfRange = 10;
function printEven(min, max) {
  if (i % 2 !== 0) {
    i += 1;
  }
  for (var i = min; i <= max; i += 2) {
    console.log(i);
  }
}
printEven(minValueOfRange, maxValueOfRange);