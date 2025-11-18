// Selección de Elementos del DOM

// Inputs
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

// Labels
const dayLabel = document.querySelector('label[for="day"]');
const monthLabel = document.querySelector('label[for="month"]');
const yearLabel = document.querySelector('label[for="year"]');

// Mensajes de error 
const errorDayEmpty = document.getElementById('error-day-empty');
const errorDayInvalid = document.getElementById('error-day-invalid');

const errorMonthEmpty = document.getElementById('error-month-empty');
const errorMonthInvalid = document.getElementById('error-month-invalid');

const errorYearEmpty = document.getElementById('error-year-empty');
const errorYearInvalid = document.getElementById('error-year-invalid');

// Spans de resultados
const spanYears = document.getElementById('years-result');
const spanMonths = document.getElementById('months-result');
const spanDays = document.getElementById('days-result');

// Formulario
const form = document.getElementById('age-form');


// Evento submit
form.addEventListener("submit", function(e) {
    e.preventDefault(); // No recargar página

    // limpiar errores previos
    clearAllErrors();

    // Validar: si falla, se detiene
    if (!validateInputs()) return;

    // parsear valores (ya validados)
    const d = parseInt(dayInput.value, 10);
    const m = parseInt(monthInput.value, 10);
    const y = parseInt(yearInput.value, 10);

    const age = calculateAge(d, m, y);

    updateUI(age);
});


// Validación
function validateInputs() {

    const d = parseInt(dayInput.value, 10);
    const m = parseInt(monthInput.value, 10);
    const y = parseInt(yearInput.value, 10);

    const today = new Date();
    const currentYear = today.getFullYear();

    let isValid = true;

    // CAMPOS VACÍOS
    if (!d && d !== 0) {
        showError(dayInput, dayLabel, errorDayEmpty);
        isValid = false;
    } else {
        hideError(dayInput, dayLabel, errorDayEmpty);
    }

    if (!m && m !== 0) {
        showError(monthInput, monthLabel, errorMonthEmpty);
        isValid = false;
    } else {
        hideError(monthInput, monthLabel, errorMonthEmpty);
    }

    if (!y && y !== 0) {
        showError(yearInput, yearLabel, errorYearEmpty);
        isValid = false;
    } else {
        hideError(yearInput, yearLabel, errorYearEmpty);
    }

    if (!isValid) return false;

    // RANGOS
    if (d < 1 || d > 31) {
        showError(dayInput, dayLabel, errorDayInvalid);
        isValid = false;
    } else {
        hideError(dayInput, dayLabel, errorDayInvalid);
    }

    if (m < 1 || m > 12) {
        showError(monthInput, monthLabel, errorMonthInvalid);
        isValid = false;
    } else {
        hideError(monthInput, monthLabel, errorMonthInvalid);
    }

    if (y > currentYear || y < 1) {
        showError(yearInput, yearLabel, errorYearInvalid);
        isValid = false;
    } else {
        hideError(yearInput, yearLabel, errorYearInvalid);
    }

    if (!isValid) return false;

    // VALIDAR FECHA REAL
    const testDate = new Date(y, m - 1, d);
    const isRealDate =
        testDate.getFullYear() === y &&
        testDate.getMonth() === m - 1 &&
        testDate.getDate() === d;

    if (!isRealDate) {
        showError(dayInput, dayLabel, errorDayInvalid);
        showError(monthInput, monthLabel, errorMonthInvalid);
        showError(yearInput, yearLabel, errorYearInvalid);
        return false;
    }

    // FECHA FUTURA
    const inputDate = new Date(y, m - 1, d);
    if (inputDate > today) {
        showError(yearInput, yearLabel, errorYearInvalid);
        return false;
    }

    return true;
}


// Funciones para mostrar/ocultar errores
function showError(input, label, message) {
    if (input) input.classList.add("input-error");
    if (label) label.classList.add("label-error");
    if (message) message.hidden = false;
}

function hideError(input, label, message) {
    if (input) input.classList.remove("input-error");
    if (label) label.classList.remove("label-error");
    if (message) message.hidden = true;
}

function clearAllErrors() {
    // inputs
    [dayInput, monthInput, yearInput].forEach(i => {
        if (i) i.classList.remove('input-error');
    });
    // labels
    [dayLabel, monthLabel, yearLabel].forEach(l => {
        if (l) l.classList.remove('label-error');
    });
    // messages
    [errorDayEmpty, errorDayInvalid,
     errorMonthEmpty, errorMonthInvalid,
     errorYearEmpty, errorYearInvalid].forEach(m => {
         if (m) m.hidden = true;
     });
}


// Calcular edad
function calculateAge(day, month, year) {

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1; // 1-12
    let currentDay = today.getDate();

    let years = currentYear - year;
    let months = currentMonth - month;
    let days = currentDay - day;

    if (days < 0) {
        // días del mes anterior
        const previousMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();
        days += previousMonthDays;
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    // Asegurar no devolver negativos por bugs
    if (years < 0) years = 0;
    if (months < 0) months = 0;
    if (days < 0) days = 0;

    return { years, months, days };
}


// Actualizar interfaz
function updateUI(age) {
    // seguridad por si los spans no existen
    if (spanYears) spanYears.textContent = age.years;
    if (spanMonths) spanMonths.textContent = age.months;
    if (spanDays) spanDays.textContent = age.days;
}

function animateValue(span, end, duration = 800) {
    let start = 0;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = currentTime - startTime;

        // porcentaje (0 → 1)
        let percent = Math.min(progress / duration, 1);

        // valor interpolado
        span.textContent = Math.floor(percent * end);

        if (percent < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function updateUI(age) {
    animateValue(spanYears, age.years);
    animateValue(spanMonths, age.months);
    animateValue(spanDays, age.days);
}

