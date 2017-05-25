const minValueOfRange = 2;
const maxValueOfRange = 10;
function printEven(min, max) {
  var i = min;
  if (i % 2 !== 0) {
    i += 1;
  }
  while (i <= max) {
    console.log(i);
    i += 2;
  }
}
printEven(minValueOfRange, maxValueOfRange);