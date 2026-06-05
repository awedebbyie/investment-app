document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================

    const helicopter = document.getElementById("helicopter");
    const multiplier = document.querySelector(".multiplier");
    const flightPath = document.getElementById("flightPath");
    const fillArea = document.getElementById("fillArea");

    // =========================
    // INVEST SYSTEM
    // =========================

    const rows = document.querySelectorAll(".invest-row");

    rows.forEach((row) => {

        const input = row.querySelector(".amount-input");
        const investBtn = row.querySelector(".invest-btn");
        const priceBtns = row.querySelectorAll(".price-btn");

        investBtn.addEventListener("click", () => {
            alert("Investment placed!");
        });

        priceBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                let value = parseFloat(btn.textContent);

                input.value = value.toFixed(2);

                if (value < 10) {
                    investBtn.innerHTML = `
                        <span>INVEST</span>
                        <small>(Minimum ₦10)</small>
                    `;
                    return;
                }

                investBtn.innerHTML = `
                    <span>INVEST</span>
                    <small>(₦${value.toFixed(2)})</small>
                `;
            });

        });

        input.addEventListener("input", () => {

            let num = parseFloat(input.value);

            if (isNaN(num)) {
                investBtn.innerHTML = `
                    <span>INVEST</span>
                `;
                return;
            }

            if (num < 10) {
                investBtn.innerHTML = `
                    <span>INVEST</span>
                    <small>(Minimum ₦10)</small>
                `;
                return;
            }

            investBtn.innerHTML = `
                <span>INVEST</span>
                <small>(₦${num.toFixed(2)})</small>
            `;
        });

        input.addEventListener("blur", () => {

            let num = parseFloat(input.value);

            if (isNaN(num)) {
                input.value = "";

                investBtn.innerHTML = `
                    <span>INVEST</span>
                `;
                return;
            }

            input.value = num.toFixed(2);

            if (num < 10) {
                investBtn.innerHTML = `
                    <span>INVEST</span>
                    <small>(Minimum ₦10)</small>
                `;
                return;
            }

            investBtn.innerHTML = `
                <span>INVEST</span>
                <small>(₦${num.toFixed(2)})</small>
            `;
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

    let loop;

    function animate() {

        if (x < 260) {

            x += 2.2;
            y -= 1.25;

        } else if (!crashed) {

            wave += 0.05;

            x += 1.6;
            y += Math.sin(wave) * 2.4;

            if (x > 340) {
                crashed = true;
            }

        } else {

            x += 2;
            y += 5;

            if (y > 340) {
                clearInterval(loop);
                return;
            }
        }

        multiplierValue += 0.01;

        if (multiplier) {
            multiplier.textContent =
                multiplierValue.toFixed(2) + "x";
        }

        if (helicopter) {
            helicopter.style.left = x + "px";
            helicopter.style.bottom = (320 - y) + "px";
        }

        points.push({
            x: x + 10,
            y: y - 9
        });

        let path = "";

        for (let i = 0; i < points.length; i++) {

            const p = points[i];

            if (i === 0) {

                path += `M ${p.x} ${p.y}`;

            } else {

                const prev = points[i - 1];

                const midX = (prev.x + p.x) / 2;
                const midY = (prev.y + p.y) / 2;

                path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
            }
        }

        if (flightPath) {
            flightPath.setAttribute("d", path);
        }

        const fill =
            path +
            ` L ${x + 25} 320
              L 0 320 Z`;

        if (fillArea) {
            fillArea.setAttribute("d", fill);
        }
    }

    loop = setInterval(animate, 30);

});