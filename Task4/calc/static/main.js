/* Термины */
// Инфиксная запись -   7 − 2 * 3 эквивалентно постфиксной ->
// Постфиксная запись - Обратная польская -   7 2 3 * -


// Функция priority позволяет получить 
// значение приоритета для оператора.
// Возможные операторы: +, -, *, /.

function priority(operation) {
    if (operation == '+' || operation == '-') {
        return 1;
    } else {
        return 2;
    }
}

// Проверка, является ли строка str числом.
function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}

// Проверка, является ли строка str цифрой.
function isDigit(str) {
    return /^\d{1}$/.test(str);
}

// Проверка, является ли строка str оператором.
function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

// Функция tokenize принимает один аргумент -- строку
// с арифметическим выражением и делит его на токены 
// (числа, операторы, скобки). Возвращаемое значение --
// массив токенов.

function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        }
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        }
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}

// Функция compile принимает один аргумент -- строку
// с арифметическим выражением, записанным в инфиксной 
// нотации, и преобразует это выражение в обратную 
// польскую нотацию (ОПН). Возвращаемое значение -- 
// результат преобразования в виде строки, в которой 
// операторы и операнды отделены друг от друга пробелами. 
// Выражение может включать действительные числа, операторы 
// +, -, *, /, а также скобки. Все операторы бинарны и левоассоциативны.
// Функция реализует алгоритм сортировочной станции 
// (https://ru.wikipedia.org/wiki/Алгоритм_сортировочной_станции).

function compile(str) {
    // alert('compile began str is ' + str);
    let out = [];
    let stack = [];
    for (token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            while (stack.length > 0 && isOperation(stack[stack.length - 1]) && priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            stack.push(token);
        } else if (token == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join(' ');
}
// Функция dotfunc разделяет число точкой
function dotfunc(dotnum, afterdot) {
    let dotstr = (`${dotnum}`);
    let long = dotstr.length;
    if (afterdot > long) { let element = 'error'; alert('Неправильный ввод'); return element }
    if (afterdot == 0) { let element = parseInt(str); return element }
    let element = dotstr.substr(0, long - afterdot) + '.' + dotstr.substr(long - afterdot, long);
    element = parseFloat(element);
    return element
}

// Функция evaluate принимает один аргумент -- строку 
// с арифметическим выражением, записанным в обратной 
// польской нотации. Возвращаемое значение -- результат 
// вычисления выражения. Выражение может включать 
// действительные числа и операторы +, -, *, /.
// Вам нужно реализовать эту функцию
// (https://ru.wikipedia.org/wiki/Обратная_польская_запись#Вычисления_на_стеке).

function evaluate(str) {
    // Переменные
    let getstr = compile(str);
    str = getstr;
    getstr = 0;
    let number1 = '';
    let number2 = 0;
    let number = [];
    let newElement = true;
    let dot = 0;
    // Считывание обратной польской строки
    for (const char of str) {

        let closeEnter = 0;
        getstr += 1;

        // Если пробел, то следующее число будет новым элементом
        // И возврат к замене char
        if (char === ' ' && parseFloat(char) != 0) {
            // Подсчитанный dot является числом цифр после точки будущего числа 
            if (dot) {
                dot = dot - 1;
                //  number.push(parseFloat(float.number.pop() / (10 ^ (dot - 1)))) 
                let dotcount = dotfunc(number.pop(), dot);
                number.push(dotcount);
                dot = 0;
            }
            newElement = true
        } else if (parseFloat(char) || parseFloat(char) == 0) {

            // Добавить char  как новый элемент
            if (newElement) {
                // number is LILO
                number.push(parseInt(char));
                // Следующий int будет добавлен к последнему элементу number
                newElement = false;
            }
            // Добавить char к последнему элементу
            else if (!dot) {
                number.push(parseInt(number.pop() + char));
            }
            else if (dot) {
                dot = dot + 1;
                number.push(parseInt(number.pop() + char));
            }

            // Переход к вычислению результата 2 чисел,
            // в случае если char содержит математические Операции
        } else if (char !== '.') {
            // Первое число идет в number1
            if (number1 == '') { number1 = number.shift(); }
            // Если минус для 1 числа
            if (char == '-') {
                // Если следующий символ str будет Операцией, то далее -number2
                if (isNaN(parseInt(str.substr(getstr + 1, 1))) && getstr < str.length) {
                    number2 = 0 - number.pop();
                    closeEnter = 1;
                } else if (number.length == 0) {
                    number1 = 0 - number1;
                    closeEnter = 1;
                }
                // Если есть второе число в стеке, то переход к Операциям
            } if (number.length > 0) { number2 = number.pop() }

            // Условие пропуска Операций
            if (closeEnter !== 1) {
                // Операции
                switch (char) {
                    case '+':
                        number1 = (+number1) + (+number2); break;
                    case '-':
                        number1 = number1 - number2; break;
                    case '*':
                        number1 = number1 * number2; break;
                    case '/':
                        number1 = number2 / number1; break;
                }
            }
        }
        else if (char === '.') {
            dot = 1;
        }
    }
    if (!parseFloat(number1)) { return number1 = 'error' }
    return number1.toFixed(2);
}

// Функция clickHandler предназначена для обработки 
// событий клика по кнопкам калькулятора. 
// По нажатию на кнопки с классами digit, operation и bracket
// на экране (элемент с классом screen) должны появляться 
// соответствующие нажатой кнопке символы.
// По нажатию на кнопку с классом clear содержимое экрана 
// должно очищаться.
// По нажатию на кнопку с классом result на экране 
// должен появиться результат вычисления введённого выражения 
// с точностью до двух знаков после десятичного разделителя (точки).
// Реализуйте эту функцию. Воспользуйтесь механизмом делегирования 
// событий (https://learn.javascript.ru/event-delegation), чтобы 
// не назначать обработчик для каждой кнопки в отдельности.

function clickHandler(event) {
    // Переменные
    let dot = true;
    let dotblock = false;
    let err = 0;
    const intscreen = document.querySelector('.screen p');
    let str = '';
    // Работает проверка на нажатие на цифровой блок
    document.querySelector('.buttons').onclick = (event) => {
        // Переполнение экрана
        if (!err && str.length >= 9) { err = 1; alert('Переполнение экрана'); }
        intscreen.textContent = str;
        // Проверка нажатий
        // Цифры и точка
        if (event.target.classList.contains('digit')) {
            // Проверка на Нажатую Цифру
            if (event.target.innerHTML != '.') {
                block = false;
                // Добавить текущий символ в конец массива
                // str.push(event.target.innerHTML);
                str += (event.target.innerHTML);
                // Добавить к содержимому <p> текущее значение заголовка
                intscreen.textContent += event.target.innerHTML;

                // Проверка на 1. используется первый раз, 2. точка не вначале строки
            } else if (!block && dot && str.length > 0) {
                dot = false;
                // intscreen.textContent = str;
                str += (event.target.innerHTML);
                intscreen.textContent += event.target.innerHTML;
            }
        }

        // Панель операций
        if (!event.target.classList.contains('digit')) {
            // Операции
            if (event.target.classList.contains('operation')) {
                dot = true;
                dotblock = true;
                str += (event.target.innerHTML);
                intscreen.textContent += event.target.innerHTML;
            }
            // Ковычки
            if (event.target.classList.contains('bracket')) {
                str += (event.target.innerHTML);
                intscreen.textContent += event.target.innerHTML;
            }

            // Сброс
            if (event.target.classList.contains('clear')) {
                str = '';
                dot = true;
                dotblock = false;
                intscreen.textContent = '';
                err = 0;
                return
            }
            // Результат
            if (event.target.classList.contains('result')) {
                let result = evaluate(str);
                if (isNaN(result)) { result = 'Ошибка' }
                intscreen.textContent = result;
                str = result;
            }

        }
    }
}

// Назначьте нужные обработчики событий.
window.onload = function (event) {
    // Вызов функции нажатия клавиш
    clickHandler();
}