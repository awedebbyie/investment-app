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
    const MIN_Y = 140;        // ← Change this to your preferred max height

    function resetGame() {
        x = 55;
        y = 320;
        multiplierValue = 1;
        phase = 1;
        
        // Use the independent crash logic
        crashPoint = window.generateCrashPoint ? window.generateCrashPoint() : (1 + Math.random() * 20);
        
        multiplierEl.textContent = "1.00x";
        
        if (flightPath) flightPath.setAttribute("d", "");
        if (fillArea) fillArea.setAttribute("d", "");
        
        helicopter.style.left = "0px";
        helicopter.style.bottom = "0px";
        helicopter.style.opacity = "1";
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
            }
        } 
        else if (phase === 3) {
            x += 18;
            y += (Math.random() - 0.5) * 3;

            if (flightPath) flightPath.setAttribute("d", "");
            if (fillArea) fillArea.setAttribute("d", "");

            if (x > MAX_X + 220) {
                helicopter.style.opacity = "0";
                isRunning = false;
                setTimeout(startNextRound, 800);
                return;
            }
        }

        if (phase !== 3) {
            multiplierValue += 0.018;
            multiplierEl.textContent = multiplierValue.toFixed(2) + "x";
        }

        if (helicopter) {
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