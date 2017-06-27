function searchCombination(state, amountCellsByWidth, amountCellsByHeight, amountForWinningSet, i) {
  let n = Math.floor( i / amountCellsByWidth);
  let m = i - amountCellsByWidth*n;
  let numberOfCell;
  let fields = g_context.fields;
  let amountOfSet = 0;
  let setOfPosition = [];

  while ((m < amountCellsByWidth-1) && (n > 0)) {
    n--;
    m++;
  }
  while ((m >= 0) && (n <= amountCellsByHeight- 1)) {
    numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    m --;
    n ++;
    if (amountOfSet === amountForWinningSet) {
      return setOfPosition;
    }
  }

  amountOfSet = 0;
  n = Math.floor(i / amountCellsByWidth);
  m = numberOfCell - amountCellsByWidth*n;
  while ((m > 0) && (n > 0)) {
    m--;
    n--;
  }
  while ((m <= amountCellsByHeight- 1) && (n <= amountCellsByHeight- 1)) {
    let numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    m ++;
    n ++;
    if (amountOfSet === amountForWinningSet) {
      return setOfPosition;
    }
  }

  amountOfSet = 0;
  n = Math.floor(i / amountCellsByWidth);
  m = numberOfCell - amountCellsByWidth*n;
  while ((m > 0)) {
    m--;
  }
  while ((m <= amountCellsByHeight- 1)) {
    let numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    m ++;
    if (amountOfSet === amountForWinningSet) {
      return setOfPosition;
    }
  }

  amountOfSet = 0;
  n = Math.floor(numberOfCell / amountCellsByWidth);
  m = numberOfCell - amountCellsByWidth*n;
  while ((n > 0)) {
    n--;
  }
  while ((n <= amountCellsByHeight- 1)) {
    let numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    n++;
    if (amountOfSet === amountForWinningSet) {
      return setOfPosition;
    }
  }
}