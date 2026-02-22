const PASSWORD = "test123";

const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");
const passwordScreen = document.getElementById("password-screen");
const gameScreen = document.getElementById("game-screen");
const victoryScreen = document.getElementById("victory-screen");

function checkPassword() {
    if (passwordInput.value === PASSWORD) {
        passwordScreen.style.display = "none";
        gameScreen.style.display = "flex";
    } else {
        passwordError.style.display = "block";
        passwordInput.value = "";
        passwordInput.focus();
    }
}

passwordSubmit.addEventListener("click", checkPassword);
passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkPassword();
});

// Simon Game
const COLORS = ["green", "gold", "cream", "sage"];
const TOTAL_ROUNDS = 5;
const SEQUENCE_SPEED = 600; // ms between each flash in sequence
const FLASH_DURATION = 350; // ms a pad stays lit
const PAUSE_BEFORE_INPUT = 400; // ms pause after sequence ends

// Audio context for tones
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const TONES = {
    green: 392, // G4
    gold: 440, // A4
    cream: 494, // B4
    sage: 330, // E4
};

function playTone(color, duration) {
    if (!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.value = TONES[color];
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);
    osc.start();
    osc.stop(audioCtx.currentTime + duration / 1000);
}

let sequence = [];
let playerIndex = 0;
let round = 0;
let accepting = false;

const pads = {};
COLORS.forEach(function (color) {
    pads[color] = document.getElementById("pad-" + color);
});

const roundDisplay = document.getElementById("simon-round");
const messageEl = document.getElementById("simon-message");
const startButton = document.getElementById("simon-start");

function flashPad(color) {
    return new Promise(function (resolve) {
        pads[color].classList.add("lit");
        playTone(color, FLASH_DURATION);
        setTimeout(function () {
            pads[color].classList.remove("lit");
            setTimeout(resolve, SEQUENCE_SPEED - FLASH_DURATION);
        }, FLASH_DURATION);
    });
}

async function playSequence() {
    accepting = false;
    setMessage("Observez...");
    setPadsDisabled(true);

    for (let i = 0; i < sequence.length; i++) {
        await flashPad(sequence[i]);
    }

    await new Promise(function (r) {
        setTimeout(r, PAUSE_BEFORE_INPUT);
    });
    accepting = true;
    playerIndex = 0;
    setPadsDisabled(false);
    setMessage("A vous !");
}

function nextRound() {
    round++;
    updateRoundDisplay();
    sequence.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    playSequence();
}

function updateRoundDisplay() {
    roundDisplay.textContent = "Tour " + round + " / " + TOTAL_ROUNDS;
}

function setMessage(msg) {
    messageEl.textContent = msg;
}

function setPadsDisabled(disabled) {
    COLORS.forEach(function (color) {
        if (disabled) {
            pads[color].classList.add("disabled");
        } else {
            pads[color].classList.remove("disabled");
        }
    });
}

function handlePadClick(color) {
    if (!accepting) return;

    pads[color].classList.add("lit");
    playTone(color, 200);
    setTimeout(function () {
        pads[color].classList.remove("lit");
    }, 200);

    if (color !== sequence[playerIndex]) {
        // Wrong!
        accepting = false;
        setMessage("Raté ! On recommence...");
        setPadsDisabled(true);
        setTimeout(function () {
            resetGame();
            nextRound();
        }, 1500);
        return;
    }

    playerIndex++;

    if (playerIndex === sequence.length) {
        // Completed this round
        accepting = false;
        setPadsDisabled(true);

        if (round >= TOTAL_ROUNDS) {
            // Won the game!
            setTimeout(showVictory, 600);
        } else {
            setMessage("Bravo !");
            setTimeout(nextRound, 1000);
        }
    }
}

function resetGame() {
    sequence = [];
    playerIndex = 0;
    round = 0;
    accepting = false;
    setMessage("");
    setPadsDisabled(true);
}

function startGame() {
    resetGame();
    startButton.style.display = "none";
    nextRound();
}

// Pad click handlers
COLORS.forEach(function (color) {
    pads[color].addEventListener("click", function () {
        handlePadClick(color);
    });
});

startButton.addEventListener("click", startGame);

// Initially disable pads
setPadsDisabled(true);

// Victory
function showVictory() {
    gameScreen.style.display = "none";
    victoryScreen.style.display = "flex";
    launchConfetti();
}

// Replay
document.getElementById("simon-replay").addEventListener("click", function () {
    victoryScreen.style.display = "none";
    gameScreen.style.display = "flex";
    startButton.style.display = "inline-block";
    resetGame();
    updateRoundDisplay();
});

// Confetti
function launchConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = ["#5D7B55", "#BAD4B5", "#fce1a5", "#FFECC3", "#c4baa3", "#e8ddc2", "#4a7c59", "#f0cf65", "#d4b896", "#a0cc90"];

    const pieces = [];
    const PIECE_COUNT = 150;

    for (let i = 0; i < PIECE_COUNT; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            vy: Math.random() * 3 + 2,
            vx: (Math.random() - 0.5) * 2,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
        });
    }

    let startTime = Date.now();
    const DURATION = 4000;

    function animate() {
        const elapsed = Date.now() - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (elapsed > DURATION) {
            // Fade out remaining pieces
            pieces.forEach(function (p) {
                p.opacity = Math.max(0, p.opacity - 0.03);
            });
        }

        let allDone = true;
        pieces.forEach(function (p) {
            if (p.opacity <= 0 && p.y > canvas.height) return;
            allDone = false;

            p.y += p.vy;
            p.x += p.vx;
            p.rotation += p.rotSpeed;
            p.vx += (Math.random() - 0.5) * 0.2;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        if (!allDone) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// Handle window resize for confetti canvas
window.addEventListener("resize", function () {
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
