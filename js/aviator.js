document.addEventListener("DOMContentLoaded", () => {
    const helicopter = document.getElementById("helicopter");
    const multiplierEl = document.querySelector(".multiplier");
    const flightPath = document.getElementById("flightPath");
    const fillArea = document.getElementById("fillArea");

    let x = 55;
    let y = 320;
    let multiplierValue = 1;
    let phase = 1;
    let crashPoint = 0;
    let lastTime = 0;
    let isRunning = false;

    const MAX_X = 335;
    const MIN_Y = 140;

    // === FLEW AWAY & COUNTDOWN ELEMENTS ===
    let flewAwayContainer = document.getElementById("flewAwayContainer");
    let countdownBarContainer = document.getElementById("countdownBarContainer");
    let countdownBar = document.getElementById("countdownBar");

    // Create elements if they don't exist
    if (!flewAwayContainer) {
        flewAwayContainer = document.createElement("div");
        flewAwayContainer.id = "flewAwayContainer";
        flewAwayContainer.style.cssText = `
            position: absolute;
            top: 33%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 100;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        `;
        
        const flewText = document.createElement("div");
        flewText.id = "flewText";
        flewText.style.cssText = `
            font-size: 23px;
            font-weight: 900;
            color: red;
            letter-spacing: 2px;
            margin-bottom: 8px;
        `;
        flewText.textContent = "FLEW AWAY!";
        
        flewAwayContainer.appendChild(flewText);
        // Append to game container (change selector if needed)
        const gameContainer = document.querySelector(".game-container") || 
                             document.querySelector("#game") || 
                             helicopter.parentElement;
        gameContainer.appendChild(flewAwayContainer);
    }

    if (!countdownBarContainer) {
        countdownBarContainer = document.createElement("div");
        countdownBarContainer.id = "countdownBarContainer";
        countdownBarContainer.style.cssText = `
            position: absolute;
            bottom: 25%;
            left: 50%;
            transform: translateX(-50%);
            width: 280px;
            height: 8px;
            background: rgba(255,255,255,0.2);
            border-radius: 4px;
            overflow: hidden;
            z-index: 95;
            opacity: 0;
            transition: opacity 0.4s;
        `;

        countdownBar = document.createElement("div");
        countdownBar.id = "countdownBar";
        countdownBar.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, #00ff88, #00cc66);
            transition: width 5s linear;
        `;

        countdownBarContainer.appendChild(countdownBar);
        const gameContainer = document.querySelector(".game-container") || 
                             document.querySelector("#game") || 
                             helicopter.parentElement;
        gameContainer.appendChild(countdownBarContainer);
    }

    function resetGame() {
        x = 55;
        y = 320;
        multiplierValue = 1;
        phase = 1;
        
        crashPoint = window.generateCrashPoint ? window.generateCrashPoint() : (1 + Math.random() * 20);
        
        multiplierEl.textContent = "1.00x";
        multiplierEl.style.color = ""; // reset color

        if (flightPath) flightPath.setAttribute("d", "");
        if (fillArea) fillArea.setAttribute("d", "");
        
        helicopter.style.left = "0px";
        helicopter.style.bottom = "0px";
        helicopter.style.opacity = "1";
        helicopter.style.transition = "none";

        // Hide overlays
        flewAwayContainer.style.opacity = "0";
        countdownBarContainer.style.opacity = "0";
        countdownBar.style.width = "100%";
    }

    function crashInstantly() {
        if (!helicopter) return;
        
        // Helicopter flies away
        helicopter.style.transition = "left 90ms linear, bottom 90ms linear, opacity 70ms linear";
        helicopter.style.left = (MAX_X + 420) + "px";
        helicopter.style.bottom = (320 - y - 140) + "px";
        helicopter.style.opacity = "0";

        // Clear path
        if (flightPath) flightPath.setAttribute("d", "");
        if (fillArea) fillArea.setAttribute("d", "");

        isRunning = false;

        // Show FLEW AWAY exactly like the video
        multiplierEl.style.color = "#ff3333";           // Red multiplier
        multiplierEl.style.transition = "color 0.2s";
        
        flewAwayContainer.style.opacity = "1";

        // Keep FLEW AWAY visible for 3 seconds
        setTimeout(() => {
            flewAwayContainer.style.opacity = "0";
        }, 3000);

        // Start countdown bar after 3 seconds
        setTimeout(() => {
            countdownBarContainer.style.opacity = "1";
            countdownBar.style.width = "100%";
            
            // Trigger animation
            countdownBar.offsetHeight;
            countdownBar.style.width = "0%";

            // Auto next round after 5 seconds
            setTimeout(() => {
                countdownBarContainer.style.opacity = "0";
                startNextRound();
            }, 5000);
        }, 3000);
    }

    function animate(timestamp) {
        if (!isRunning) return;

        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        if (delta < 16) {
            requestAnimationFrame(animate);
            return;
        }
        lastTime = timestamp;

        if (phase === 1) {
            x += 2.8;
            y -= 1.4;
            if (x >= 220) phase = 2;
        } 
        else if (phase === 2) {
            if (x < MAX_X - 35) {
                x += 2.45;
            } else {
                x = Math.min(x + (Math.random() - 0.5) * 2.2, MAX_X);
            }

            const waveIntensity = (x > MAX_X - 70) ? 10.5 : 6.5;
            y += (Math.random() - 0.5) * waveIntensity;

            if (y < MIN_Y) y = MIN_Y + Math.abs((MIN_Y - y) * 0.6);

            if (multiplierValue >= crashPoint) {
                phase = 3;
                crashInstantly();
                return;
            }
        } 
        else if (phase === 3) {
            crashInstantly();
            return;
        }

        if (phase !== 3) {
            multiplierValue += 0.018;
            multiplierEl.textContent = multiplierValue.toFixed(2) + "x";
        }

        if (phase !== 3 && helicopter) {
            const displayX = Math.min(x, MAX_X + 50);
            helicopter.style.left = (displayX - 55) + "px";
            helicopter.style.bottom = (320 - y) + "px";
        }

        if (phase !== 3 && flightPath) {
            const drawX = Math.min(x, MAX_X);
            const drawY = Math.max(y, MIN_Y);
            const path = `M 0 320 L ${drawX} ${drawY}`;
            flightPath.setAttribute("d", path);
            if (fillArea) {
                fillArea.setAttribute("d", path + ` L ${drawX} 320 L 0 320 Z`);
            }
        }

        requestAnimationFrame(animate);
    }

    function startNextRound() {
        resetGame();
        isRunning = true;
        lastTime = 0;
        requestAnimationFrame(animate);
    }

    // Auto start
    setTimeout(() => {
        startNextRound();
    }, 600);
});