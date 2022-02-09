//Example1
//1 5 6 2 3 4

// console.log("Record 1");
// setTimeout(() => {
//   console.log("Record 2");
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//       console.log("Record 3");
//       Promise.resolve().then(() => {
//         console.log("Record 4");
//       });
//     });
//   });
// });

// console.log("Record 5");
// Promise.resolve().then(() =>
//   Promise.resolve().then(() => console.log("Record 6"))
// );

//example2
//импортируем модуль events
const EventEmitter = require("events");
const emitter = new EventEmitter();

//делаем объект с запросами
const requestTypes = [{ type: "timer" }, { type: "stop" }];

//создаем переменные для параметров строки
let args = process.argv.slice(2);
let date = new Date(args);

//класс таймер для передачи данный в обработчик события
//не знаю, нужен он или можно переделать код без него
class Timer {
  constructor({ days, hours, minutes, seconds }) {
    this.days = days;
    this.hours = hours;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}

//обработчик событий
class Handler {
  static timer(payload) {
    let { days, hours, minutes, seconds } = payload;
    console.log(
      `Осталось ${addZero(days)} дней ${addZero(hours)}:${addZero(
        minutes
      )}:${addZero(seconds)}`
    );
  }

  static stop() {
    console.log("Таймер остановлен");
  }
}

//функция, проверяющая данные и делающая задержку
const startTimer = async () => {
  if (diffTime() > 0) {
    let payload = showTime(); //кладем полученные данные в переменную для передачи в обработчик

    emitter.emit("timer", payload);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    startTimer();
  } else {
    emitter.emit("stop");
  }
};

//функция для расчета полученных данный и на положительный результат и заодно перевод в секунды
const diffTime = () => {
  let now = new Date();
  let diff = Math.floor((date - now) / 1000);
  return diff;
};

//функция перевода полученного времени в нужный нам формат
function showTime() {
  let diff = diffTime();
  let days = Math.floor(diff / (60 * 60 * 24));
  diff = diff % (60 * 60 * 24);

  let hours = Math.floor(diff / (60 * 60));
  diff = diff % (60 * 60);

  let minutes = Math.floor(diff / 60);
  diff = diff % 60;

  let seconds = diff;

  //   console.log(
  //     `Осталось ${addZero(days)} дней ${addZero(hours)}:${addZero(
  //       minutes
  //     )}:${addZero(seconds)}`
  //   );

  return new Timer({ days, hours, minutes, seconds });
}

//функция для косметического преобразования данных , которые меньше 0
function addZero(num) {
  if (num <= 9) {
    num = "0" + num;
  }
  return num;
}

//навешиваем слушателей
emitter.on("timer", Handler.timer);
emitter.on("stop", Handler.stop);

startTimer();
