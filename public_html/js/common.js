window.addEventListener('load', function OnWindowLoaded() {

    // Set of buttons of the calculator
    //   'MC',  'MR',   'M+',   'M-',
    //   '%',   '√',    'x²',   '⅟x',
    //   'CE',  'C',    '⌫',   '÷',
    //   '7',   '8',    '9',    '×',
    //   '4',   '5',    '6',    '−',
    //   '1',   '2',    '3',    '+',
    //   '±',   '0',    '.',    '='
    var buttons = [
        'MC', 'MR', 'M+', 'M-',
        '%', '\u221A', 'x\u00B2', '\u215Fx',
        'CE', 'C', '\u232B', '\u00F7',
        '7', '8', '9', '\u00D7',
        '4', '5', '6', '\u2212',
        '1', '2', '3', '+',
        '\u00B1', '0', '.', '='
    ];

    // Calculator form
    var calculator = document.getElementById('calc');

    // The text field with input value
    var inputVal = document.getElementById('inputVal');

    // The text field with a mathematical expression
    var historyVal = document.getElementById('historyVal');

    // The memory of the calculator
    var memory = 0;

    // Adding buttons to the calculator form
    buttons.forEach(function (button) {
        let btnElement = document.createElement('div');
        btnElement.className = 'button';
        if ('0123456789'.includes(button)) {
            btnElement.className += ' number';
        } else if (button.includes('M')) {
            btnElement.id = 'memory ' + button;
            btnElement.className += ' memory';
            if (button === 'MC' || button === 'MR') {
                btnElement.className += ' empty';
            }
        }
        btnElement.innerHTML = button;
        calculator.appendChild(btnElement);
    });

    // Add a click handler for each button
    document.querySelectorAll('#calc-wrap .button').forEach(function (button) {
        // Add the action performed by clicking on the button
        button.addEventListener('click', onButtonClick);
    });

    // Handling button presses of the calculator
    function onButtonClick(c) {
        switch (c.target.innerHTML) {
            case 'MC':
                // If the "MC" button is pressed, it clears the memory
                memory = 0;
                memoryEmpty(true);
                break;
            case 'MR':
                // If the "MR" button is pressed, it returns the memory value
                inputVal.innerHTML = memory;
                break;
            case 'M+':
                // If the "M+" button is pressed, it adds a value to the memory value
                memory = eval(memory + '+' + inputVal.innerHTML);
                memoryEmpty(false);
                break;
            case 'M-':
                // If the "M -" button is pressed, it subtracts the value from the memory value
                memory = eval(memory + '-' + inputVal.innerHTML);
                memoryEmpty(false);
                break;
            case '%':
                // If the " % " button is pressed, it calculates the percentage
                if (historyVal.innerHTML.length > 0) {
                    let hist = historyVal.innerHTML;
                    if (hist.substr(-1) === ('/' || '*')) {
                        inputVal.innerHTML = "0." + inputVal.innerHTML;
                    } else {
                        inputVal.innerHTML = eval(hist.slice(0, -1)) * inputVal.innerHTML / 100;
                    }
                }
                break;
            case '\u221A':
                // If the " √ " button is pressed, it calculates the square root of the number
                inputVal.innerHTML = Math.sqrt(inputVal.innerHTML);
                break;
            case 'x\u00B2':
                // If the " x² " button is pressed, the number is squared
                inputVal.innerHTML = Math.pow(inputVal.innerHTML, 2);
                break;
            case '\u215Fx':
                // If you press " ⅟x " that calculates the fraction of the number
                inputVal.innerHTML = 1 / inputVal.innerHTML;
                break;
            case 'CE':
                // If the " CE " button is pressed, it resets the input value
                inputVal.innerHTML = '0';
                break;
            case 'C':
                // If the " C " button is pressed, it resets all values
                historyVal.innerHTML = '';
                inputVal.innerHTML = '0';
                break;
            case '\u232B':
                // If the " ⌫ " button is pressed, it deletes the last number
                if (inputVal.innerHTML.length === 1) {
                    inputVal.innerHTML = '0';
                } else {
                    inputVal.innerHTML = inputVal.innerHTML.slice(0, -1);
                }
                break;
            case '\u00F7':
                // If the " ÷ " button is pressed, the division is performed
                historyVal.innerHTML += inputVal.innerHTML + '/';
                inputVal.innerHTML = '0';
                break;
            case '\u00D7':
                // If the " × " button is pressed, multiplication is performed
                historyVal.innerHTML += inputVal.innerHTML + '*';
                inputVal.innerHTML = '0';
                break;
            case '\u2212':
                // If the " − " button is pressed, subtraction is performed
                historyVal.innerHTML += inputVal.innerHTML + '-';
                inputVal.innerHTML = '0';
                break;
            case '+':
                // If the " + " button is pressed, the addition is performed
                historyVal.innerHTML += inputVal.innerHTML + '+';
                inputVal.innerHTML = '0';
                break;
            case '=':
                // If the " = " button is pressed, the result of the expression is calculated
                historyVal.innerHTML += inputVal.innerHTML;
                inputVal.innerHTML = eval(historyVal.innerHTML);
                historyVal.innerHTML = '';
                break;
            case '.':
                // If the " . " button is pressed, the decimal value is added
                if (!inputVal.innerHTML.includes('.')) {
                    inputVal.innerHTML += c.target.innerHTML;
                }
                break;
            case '\u00B1':
                // If the " ± " button is pressed, the number changes to negative
                if (inputVal.innerHTML.includes('-')) {
                    inputVal.innerHTML = inputVal.innerHTML.replace('-', '');
                } else {
                    inputVal.innerHTML = '-' + inputVal.innerHTML;
                }
                break;
            default:
                // If a number is pressed, the number is entered
                if ('0123456789'.includes(c.target.innerHTML)) {
                    if (inputVal.innerHTML === '0') {
                        inputVal.innerHTML = c.target.innerHTML;
                    } else {
                        inputVal.innerHTML += c.target.innerHTML;
                    }
                } else {
                    historyVal.innerHTML += inputVal.innerHTML + c.target.innerHTML;
                    inputVal.innerHTML = '0';
                }
                break;
        }
    }

    // If the memory is empty, the 'MC' and 'MR' buttons become inactive
    function memoryEmpty(b) {
        if (b) {
            document.getElementById('memory MC').className = 'button memory empty';
            document.getElementById('memory MR').className = 'button memory empty';
        } else {
            document.getElementById('memory MC').className = 'button memory';
            document.getElementById('memory MR').className = 'button memory';
        }
    }
});