function searchCombination(game, fields, state, amountCellsByWidth, amountCellsByHeight, amountForWinningSet, i) {
  let n = Math.floor(i / amountCellsByWidth);
  let m = i - amountCellsByWidth * n;
  let numberOfCell;
  let amountOfSet = 0;
  let setOfPosition = [];

  while ((m < amountCellsByWidth - 1) && (n > 0)) {  //проверка выигрышной комбинации по направлению:
    n--;                                             // правый верхний угол - левый нижний угол
    m++;
  }
  while ((m >= 0) && (n <= amountCellsByHeight - 1)) {
    numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    m--;
    n++;
    if (amountOfSet === amountForWinningSet) {
      game.winningSet = setOfPosition;
      return game;
    }
  }

  amountOfSet = 0;
  n = Math.floor(i / amountCellsByWidth);
  m = i - amountCellsByWidth * n;
  while ((m > 0) && (n > 0)) { //проверка выигрышной комбинации по направлению:
    m--;                       //левый верхний угол - правый нижний угол
    n--;
  }
  while ((m <= amountCellsByHeight - 1) && (n <= amountCellsByHeight - 1)) {
    let numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    m++;
    n++;
    if (amountOfSet === amountForWinningSet) {
      game.winningSet = setOfPosition;
      return game;
    }
  }

  amountOfSet = 0;
  n = Math.floor(i / amountCellsByWidth);
  m = i - amountCellsByWidth * n;
  while ((m > 0)) {  //проверка выигрышной комбинации по горизотали
    m--;
  }
  while ((m <= amountCellsByHeight - 1)) {
    let numberOfCell = n * amountCellsByWidth + m;
    if (fields[numberOfCell].nameOfSymbol === state) {
      setOfPosition[amountOfSet] = numberOfCell;
      amountOfSet++;
    } else {
      amountOfSet = 0;
      setOfPosition = [];
    }
    m++;
    if (amountOfSet === amountForWinningSet) {
      game.winningSet = setOfPosition;
      return game;
    }
  }

  amountOfSet = 0;
  n = Math.floor(i / amountCellsByWidth);
  m = i - amountCellsByWidth * n;
  while ((n > 0)) { //проверка выигрышной комбинации по вертикали
    n--;
  }
  while ((n <= amountCellsByHeight - 1)) {
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
      game.winningSet = setOfPosition;
      return game;
    }
  }
  return [];
}