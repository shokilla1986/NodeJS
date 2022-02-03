import colors from "colors";
let arr = [];
let args = process.argv.slice(2);

let [x, y] = args;
let a = Number(x);
let b = Number(y);

let colorsArr = [colors.green, colors.yellow, colors.red];
let countColors = 0;

function isPrime(num) {
  let i = 2;
  while (i < num) {
    if (num % i == 0) {
      return false;
    }
    i++;
  }
  return true;
}

function showNumbers(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(colorsArr[countColors](arr[i]));
    countColors++;
    if (countColors >= colorsArr.length) {
      countColors = 0;
    }
  }
}

if (isNaN(a) || a < 0 || isNaN(b) || b < 0) {
  console.log(
    colors.america("Переданные аргументы не являются числом или меньше 0!")
  );
} else {
  while (+a <= +b) {
    if (isPrime(a)) {
      arr.push(a);
    }
    a++;
  }
  showResult();
}

function showResult() {
  if (arr.length) {
    showNumbers(arr);
  } else {
    console.log(colors.red("Простых чисел нет!"));
  }
}

// console.log(arr);
