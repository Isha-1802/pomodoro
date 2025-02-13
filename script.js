let workDuration = 25 * 60;  // Work duration in seconds
let breakDuration = 5 * 60;  // Break duration in seconds
let timer;
let isTimerRunning = false;
let isOnBreak = false;

const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

function updateDisplay(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopTimer() {
    if (isTimerRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        startStopButton.textContent = 'Stop';
        if (isOnBreak) {
            startTimer(breakDuration);
        } else {
            startTimer(workDuration);
        }
    }
    isTimerRunning = !isTimerRunning;
}

function startTimer(duration) {
    let timeLeft = duration;
    updateDisplay(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            isOnBreak = !isOnBreak;
            playNotification();
            startStopButton.textContent = 'Start';
            isTimerRunning = false;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    isOnBreak = false;
    updateDisplay(workDuration);
    startStopButton.textContent = 'Start';
}

function playNotification() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
}

workDurationInput.addEventListener('change', () => {
    workDuration = workDurationInput.value * 60;
    if (!isTimerRunning && !isOnBreak) {
        updateDisplay(workDuration);
    }
});

breakDurationInput.addEventListener('change', () => {
    breakDuration = breakDurationInput.value * 60;
    if (!isTimerRunning && isOnBreak) {
        updateDisplay(breakDuration);
    }
});

// Initialize the display
updateDisplay(workDuration);
