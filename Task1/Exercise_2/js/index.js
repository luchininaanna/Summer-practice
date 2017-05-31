let userName = prompt('Кто пришёл?', '');
if (userName === 'Админ') {
  let pass = prompt('Пароль?', '');
  if (pass === 'Чёрный Властелин') {
    alert('Добро пожаловать!');
  } else if (pass === null) {
    alert('Вход отменён');
  } else {
    alert('Пароль неверен');
  }
} else if (userName === null) {
  alert('Вход отменён');
} else {
  alert('Я вас не знаю');
}