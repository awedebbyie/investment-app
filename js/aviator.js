let loop;

document.addEventListener("DOMContentLoaded", () => {

const helicopter = document.getElementById("helicopter");
const multiplier = document.querySelector(".multiplier");
const flightPath = document.getElementById("flightPath");
const fillArea = document.getElementById("fillArea");

let x = 55;
let y = 320;

let multiplierValue = 1;
multiplier.textContent = "1.00x";

let phase = 1;
let restartDelay = false;

function animate() {

    // Normal flight
// =========================
// PHASE SYSTEM MOVEMENT
// =========================

// PHASE 1 → origin to 3rd mark (straight line)
if (phase === 1) {

    x += 2.2;
    y -= 1.25;

    if (x >= 200) {
        phase = 2;
    }
}

// PHASE 2 → unstable movement (3rd → 5th mark)
else if (phase === 2) {

    x += 1.6;
    y += (Math.random() - 0.5) * 8;

    if (x >= 340) {
        phase = 3;
    }
}

// PHASE 3 → fly away + reset trigger
else if (phase === 3) {
    // fly away fast
    x += 8;
    y -= 6;
    
    // hide line immediately
    flightPath.setAttribute("d", "");
    fillArea.setAttribute("d", "");
    
    // wait until helicopter leaves screen
    if (x > 500 || y < -50) {
    
        x = 55;
        y = 320;
    
        multiplierValue = 1;
        multiplier.textContent = "1.00x";
    
        phase = 1;
    
        return;
    }
    }
    
    // Update multiplier ONLY while flying
    if (phase !== 3) {

        multiplierValue += 0.01;
        
        if (multiplier) {
            multiplier.textContent =
                multiplierValue.toFixed(2) + "x";
        }
        
        }
    
    // Move helicopter
    if (helicopter) {
        helicopter.style.left = (x - 55) + "px";
helicopter.style.bottom = (320 - y) + "px";
    }
    
    // Draw straight line from origin
    const path = `M 0 320 L ${x} ${y}`;
    
    if (flightPath) {
        flightPath.setAttribute("d", path);
    }
    
    if (fillArea) {
        fillArea.setAttribute(
            "d",
            path + ` L ${x} 320 L 0 320 Z`
        );
    }
    
    }
console.log("animate running");
loop = setInterval(animate, 30);

});