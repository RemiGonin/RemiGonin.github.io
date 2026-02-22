// Change this to the expected answer (lowercase, no accents)
var ANSWER = "feur";

var input = document.getElementById("morse-input");
var validateButton = document.getElementById("morse-validate");
var errorEl = document.getElementById("morse-error");
var gameScreen = document.getElementById("game-screen");
var victoryScreen = document.getElementById("victory-screen");

function normalize(str) {
    return str
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function checkAnswer() {
    if (normalize(input.value) === normalize(ANSWER)) {
        gameScreen.style.display = "none";
        victoryScreen.style.display = "flex";
        launchConfetti();
    } else {
        errorEl.style.display = "block";
        input.focus();
    }
}

validateButton.addEventListener("click", checkAnswer);
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkAnswer();
});

// Hide error on new input
input.addEventListener("input", function () {
    errorEl.style.display = "none";
});

// Replay
document.getElementById("morse-replay").addEventListener("click", function () {
    victoryScreen.style.display = "none";
    gameScreen.style.display = "flex";
    input.value = "";
    errorEl.style.display = "none";
});

// Confetti
function launchConfetti() {
    var canvas = document.getElementById("confetti-canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var confettiColors = ["#5D7B55", "#BAD4B5", "#fce1a5", "#FFECC3", "#c4baa3", "#e8ddc2", "#4a7c59", "#f0cf65", "#d4b896", "#a0cc90"];

    var pieces = [];
    var PIECE_COUNT = 150;

    for (var i = 0; i < PIECE_COUNT; i++) {
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

    var startTime = Date.now();
    var DURATION = 4000;

    function animate() {
        var elapsed = Date.now() - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (elapsed > DURATION) {
            pieces.forEach(function (p) {
                p.opacity = Math.max(0, p.opacity - 0.03);
            });
        }

        var allDone = true;
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

window.addEventListener("resize", function () {
    var canvas = document.getElementById("confetti-canvas");
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
