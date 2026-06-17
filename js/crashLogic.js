// crashLogic.js - Crash Generator with Admin Cap + Daily Reset

/**
 * =========================
 * GLOBAL STATE
 * =========================
 */

// Current crash cap (null = disabled)
window.CRASH_CAP = null;

// Timestamp for daily reset tracking
window.CRASH_CAP_SET_TIME = null;

// Default duration: 24 hours
const CAP_DURATION_MS = 24 * 60 * 60 * 1000;


/**
 * =========================
 * ADMIN CONTROL PANEL API
 * =========================
 */

/**
 * Admin sets crash cap
 * @param {number} value - max multiplier allowed (e.g. 25)
 */
window.adminSetCrashCap = function (value) {
    window.CRASH_CAP = value;
    window.CRASH_CAP_SET_TIME = Date.now();

    console.log(`🛠️ Admin Cap Set: ${value}x (expires in 24h)`);
};

/**
 * Admin disables cap manually
 */
window.adminClearCrashCap = function () {
    window.CRASH_CAP = null;
    window.CRASH_CAP_SET_TIME = null;

    console.log("🛠️ Admin Cap Cleared");
};


/**
 * =========================
 * AUTO RESET SYSTEM (24h)
 * =========================
 */
function checkCapExpiry() {
    if (window.CRASH_CAP === null || window.CRASH_CAP_SET_TIME === null) return;

    const now = Date.now();

    if (now - window.CRASH_CAP_SET_TIME >= CAP_DURATION_MS) {
        window.CRASH_CAP = null;
        window.CRASH_CAP_SET_TIME = null;

        console.log("⏰ Crash cap auto-reset after 24 hours");
    }
}

// Check every minute
setInterval(checkCapExpiry, 60 * 1000);


/**
 * =========================
 * CRASH GENERATOR
 * =========================
 */
function generateCrashPoint() {
    const rand = Math.random();
    let crashPoint;

    // 75%: 1x - 2x
    if (rand < 0.75) {
        crashPoint = 1 + Math.random() * 1;
    }

    // 18%: 1x - 4x
    else if (rand < 0.93) {
        crashPoint = 1 + Math.random() * 3;
    }

    // 6%: 1x - 8x
    else if (rand < 0.99) {
        crashPoint = 1 + Math.random() * 7;
    }

    // 1%: 1x - 12x
    else {
        crashPoint = 1 + Math.random() * 11;
    }

    crashPoint = Number(crashPoint.toFixed(2));

    // Apply admin cap if active
    if (window.CRASH_CAP !== null) {
        crashPoint = Math.min(crashPoint, window.CRASH_CAP);
    }

    return crashPoint;
}


/**
 * =========================
 * SEEDED VERSION
 * =========================
 */
function generateCrashPointWithSeed(seed) {
    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }

    const seededRand = Math.abs(Math.sin(hash) * 10000) % 1;

    let crashPoint;

    if (seededRand < 0.75) {
        crashPoint = 1 + seededRand * 1;
    } else if (seededRand < 0.93) {
        crashPoint = 1 + seededRand * 3;
    } else if (seededRand < 0.99) {
        crashPoint = 1 + seededRand * 7;
    } else {
        crashPoint = 1 + seededRand * 11;
    }

    crashPoint = Number(crashPoint.toFixed(2));

    // Apply admin cap
    if (window.CRASH_CAP !== null) {
        crashPoint = Math.min(crashPoint, window.CRASH_CAP);
    }

    return crashPoint;
}


/**
 * Export functions
 */
window.generateCrashPoint = generateCrashPoint;
window.generateCrashPointWithSeed = generateCrashPointWithSeed;

console.log("🚁 Crash Logic Loaded (Admin Cap + 24h Reset Enabled)");