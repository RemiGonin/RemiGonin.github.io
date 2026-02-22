// Correct answers: bowl number -> flavor
// Change this mapping to match the real bowls
var ANSWERS = {
    1: "Ail",
    2: "Sel et vinaigre",
    3: "Chèvre et piment d'Espelette",
    4: "Tartiflette",
    5: "Pastis",
};

var FLAVORS = Object.values(ANSWERS);
var PLACEHOLDER = "Appuyez pour choisir";
var MAX_ATTEMPTS = 3;
var attempts = 0;

var cards = document.querySelectorAll(".chips-bowl-card");
var validateButton = document.getElementById("chips-validate");
var retryButton = document.getElementById("chips-retry");
var messageEl = document.getElementById("chips-message");
var gameScreen = document.getElementById("game-screen");
var victoryScreen = document.getElementById("victory-screen");
var victoryScore = document.getElementById("victory-score");

// Tap to cycle through flavors
cards.forEach(function (card) {
    card.addEventListener("click", function () {
        if (card.classList.contains("locked")) return;

        var idx = parseInt(card.dataset.index, 10);
        idx++;
        if (idx >= FLAVORS.length) idx = -1;
        card.dataset.index = idx;

        var flavorEl = card.querySelector(".chips-bowl-flavor");
        if (idx === -1) {
            flavorEl.textContent = PLACEHOLDER;
            card.classList.remove("selected");
        } else {
            flavorEl.textContent = FLAVORS[idx];
            card.classList.add("selected");
        }

        checkAllFilled();
    });
});

function checkAllFilled() {
    var allFilled = Array.from(cards).every(function (c) {
        return parseInt(c.dataset.index, 10) >= 0;
    });
    validateButton.disabled = !allFilled;
}

// Validate
validateButton.addEventListener("click", function () {
    attempts++;
    var correct = 0;
    var lastAttempt = attempts >= MAX_ATTEMPTS;

    cards.forEach(function (card) {
        var bowl = card.dataset.bowl;
        var idx = parseInt(card.dataset.index, 10);
        var chosen = idx >= 0 ? FLAVORS[idx] : "";
        var answer = ANSWERS[bowl];

        card.classList.remove("correct", "wrong");
        card.classList.add("locked");

        if (chosen === answer) {
            card.classList.add("correct");
            correct++;
        } else {
            card.classList.add("wrong");
            if (lastAttempt) {
                var label = document.createElement("p");
                label.className = "chips-correct-answer";
                label.textContent = answer;
                card.appendChild(label);
            }
        }
    });

    validateButton.disabled = true;

    if (correct === 5) {
        setTimeout(showVictory, 800);
    } else if (lastAttempt) {
        messageEl.textContent = correct + " / 5 — C'était le dernier essai !";
    } else {
        var remaining = MAX_ATTEMPTS - attempts;
        messageEl.textContent = correct + " / 5 — Encore " + remaining + " essai" + (remaining > 1 ? "s" : "") + " !";
        retryButton.style.display = "inline-block";
    }
});

function showVictory() {
    gameScreen.style.display = "none";
    victoryScreen.style.display = "flex";
    victoryScore.textContent = "5 / 5 — Sans faute !";
    launchConfetti();
}

function resetGame() {
    messageEl.textContent = "";
    validateButton.disabled = true;
    retryButton.style.display = "none";

    cards.forEach(function (card) {
        card.classList.remove("correct", "wrong", "selected", "locked");
        card.dataset.index = -1;
        var label = card.querySelector(".chips-correct-answer");
        if (label) label.remove();
        card.querySelector(".chips-bowl-flavor").textContent = PLACEHOLDER;
    });
}

// Retry
retryButton.addEventListener("click", resetGame);

// Replay (from victory screen)
document.getElementById("chips-replay").addEventListener("click", function () {
    victoryScreen.style.display = "none";
    gameScreen.style.display = "flex";
    attempts = 0;
    resetGame();
});

// Confetti
function launchConfetti() {
    var canvas = document.getElementById("confetti-canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var confettiColors = [
        "#5D7B55", "#BAD4B5", "#fce1a5", "#FFECC3",
        "#c4baa3", "#e8ddc2", "#4a7c59", "#f0cf65",
        "#d4b896", "#a0cc90",
    ];

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
