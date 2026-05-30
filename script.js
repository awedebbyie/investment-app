document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================

    const helicopter =
        document.getElementById("helicopter");

    const multiplier =
        document.querySelector(".multiplier");

    const flightPath =
        document.getElementById("flightPath");

    const fillArea =
        document.getElementById("fillArea");

    // =========================
    // INVEST SYSTEM
    // =========================

    const rows =
        document.querySelectorAll(".invest-row");

    rows.forEach((row) => {

        const input =
            row.querySelector(".amount-input");

        const investBtn =
            row.querySelector(".invest-btn");

        const priceBtns =
            row.querySelectorAll(".price-btn");

        // =========================
        // INVEST BUTTON
        // =========================

        investBtn.addEventListener("click", () => {

            alert("Investment placed!");

        });

        // =========================
        // QUICK PRICE BUTTONS
        // =========================

        priceBtns.forEach(btn => {

            btn.addEventListener("click", () => {

                let value =
                    parseFloat(btn.textContent);

                if (value < 10) {

                    value = 10;
                }

                input.value =
                    value.toFixed(2);
            });

        });

        // =========================
        // INPUT FIX
        // =========================

        input.addEventListener("input", () => {

            let value =
                input.value;

            value =
                value.replace(/[^0-9.]/g, "");

            let parts =
                value.split(".");

            if (parts.length > 2) {

                value =
                    parts[0] +
                    "." +
                    parts.slice(1).join("");
            }

            input.value =
                value;
        });

        input.addEventListener("blur", () => {

            let num =
                parseFloat(input.value);

            if (isNaN(num) || num < 10) {

                num = 10;
            }

            input.value =
                num.toFixed(2);

        });

    });

    // =========================
    // AVIATOR SYSTEM
    // =========================

    let x = 0;

    let y = 320;

    let wave = 0;

    let multiplierValue = 1.00;

    let points = [];

    let crashed = false;

    // =========================
    // ANIMATION
    // =========================

    function animate() {

        // =========================
        // STAGE 1
        // STRAIGHT TAKEOFF
        // TO 4TH X-AXIS DOT
        // =========================

        if (x < 260) {

            x += 2.2;

            // PERFECT DIAGONAL

            y -= 1.25;
        }

        // =========================
        // STAGE 2
        // DYNAMIC CURVE MOTION
        // =========================

        else if (!crashed) {

            wave += 0.05;

            x += 1.6;

            y +=
                Math.sin(wave) * 2.4;

            // CRASH CONDITION

            if (x > 340) {

                crashed = true;
            }
        }

        // =========================
        // STAGE 3
        // CRASH FALL
        // =========================

        else {

            x += 2;

            y += 5;

            if (y > 340) {

                clearInterval(loop);
            }
        }

        // =========================
        // MULTIPLIER
        // =========================

        multiplierValue += 0.01;

        multiplier.textContent =
            multiplierValue.toFixed(2) + "x";

        // =========================
        // HELICOPTER POSITION
        // =========================

        helicopter.style.left =
            x + "px";

        helicopter.style.bottom =
            (320 - y) + "px";

        // =========================
        // SAVE GRAPH POINT
        // =========================

        
        points.push({

            x: x + 10,
        
            y: y - 9
        });
        
        // PREVENT TRAIL DRAWING TOO EARLY
        
        if(points.length < 2){
        
            return;
        }

        // =========================
        // GRAPH CURVE
        // =========================

        let path = "";

        for (let i = 0; i < points.length; i++) {
        
            const p = points[i];
        
            let dynamicY = p.y;
        
            if (i === 0) {
        
                path += `M ${p.x} ${dynamicY}`;
        
            } else {
        
                const prev = points[i - 1];
        
                const midX =
                    (prev.x + p.x) / 2;
        
                const midY =
                    (prev.y + dynamicY) / 2;
        
                path += `
                    Q ${prev.x} ${prev.y}
                    ${midX} ${midY}
                `;
            }
        }
        
        flightPath.setAttribute(
            "d",
            path
        );

        // =========================
        // FILL AREA
        // =========================

        let fill =
            path +
            ` L ${x + 25} 320
              L 0 320 Z`;

        fillArea.setAttribute(
            "d",
            fill
        );
    }

    // =========================
    // START LOOP
    // =========================

    const loop =
        setInterval(
            animate,
            30
        );

});