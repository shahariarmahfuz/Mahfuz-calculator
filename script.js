function editDisplay() {
    var display = document.getElementById('display');
    display.removeAttribute('disabled');
    display.focus();
}

function toggleCalculator() {
    var ageCalculator = document.getElementById('ageCalculator');
    var scientificCalculator = document.getElementById('scientificCalculator');

    if (scientificCalculator.style.display === 'none') {
        scientificCalculator.style.display = 'block';
        ageCalculator.style.display = 'none';
    } else {
        scientificCalculator.style.display = 'none';
        ageCalculator.style.display = 'block';
    }
}

function appendToDisplay(value) {
    var display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    var display = document.getElementById('display');
    display.value = '';
}

function calculate() {
    var display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateAge() {
    var birthdateInput = document.getElementById('birthdate');
    var birthdate = new Date(birthdateInput.value);

    if (!isNaN(birthdate.getTime())) {
        var today = new Date();
        var age = today.getFullYear() - birthdate.getFullYear();
        var monthDiff = today.getMonth() - birthdate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        var ageResult = document.getElementById('ageResult');
        ageResult.textContent = 'Your age is: ' + age + ' years, ' + monthDiff + ' months, and ' + (today.getDate() - birthdate.getDate()) + ' days.';
    } else {
        var ageResult = document.getElementById('ageResult');
        ageResult.textContent = 'Invalid date. Please enter a valid birthdate.';
    }
}

// Handle keyboard events for calculator
document.addEventListener('keydown', function(event) {
    var key = event.key;
    var display = document.getElementById('display');

    // Allow digits, operators, parentheses, and specific keys
    if (/[\d()+\-*/.^]|Enter|Backspace|Delete|Escape/.test(key)) {
        if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            clearDisplay();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else if (key === 'Delete') {
            display.value = '';
        } else {
            appendToDisplay(key);
        }
        event.preventDefault(); // Prevent default behavior for non-input keys
    }
});
