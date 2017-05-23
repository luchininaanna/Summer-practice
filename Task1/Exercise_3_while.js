var startValue = 2;
var FINISH_VALUE = 10;
if (startValue % 2 != 0) {
  startValue += 1;
}
while (startValue <= FINISH_VALUE) {
  console.log(startValue);
  startValue += 2;
}
