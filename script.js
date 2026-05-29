document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // INVEST SYSTEM
    // =========================

    const rows = document.querySelectorAll(".invest-row");

    rows.forEach((row) => {

        const input =
            row.querySelector(".amount-input");

        const investBtn =
            row.querySelector(".invest-btn");

        const priceBtns =
            row.querySelectorAll(".price-btn");

        const baseText = "INVEST";

        // =========================
        // FORMAT MONEY
        // =========================

        function formatMoney(value) {

            let num = parseFloat(value);

            if (isNaN(num)) return "";

            return num.toFixed(2);
        }

        // =========================
        // UPDATE BUTTON
        // =========================

        function updateButton(value) {

            if (
                value === "" ||
                value === "." ||
                isNaN(parseFloat(value))
            ) {

                investBtn.innerHTML = `
                    <div>
                        ${baseText}
                    </div>
                `;

                return;
            }

            investBtn.innerHTML = `
                <div>
                    ${baseText}
                </div>

                <div style="
                    font-size:14px;
                    margin-top:4px;
                ">
                    (${value})
                </div>
            `;
        }

        // =========================
        // QUICK PRICE BUTTONS
        // =========================

        priceBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                let value =
                    parseFloat(btn.textContent);

                if (value < 10) {

                    value = 10;
                }

                input.value =
                    formatMoney(value);

                updateButton(
                    formatMoney(value)
                );

            });

        });

        // =========================
        // INPUT HANDLING
        // =========================

        input.addEventListener("input", () => {

            let value = input.value;

            // ALLOW ONLY NUMBERS + ONE DOT

            value =
                value.replace(/[^0-9.]/g, "");

            const parts =
                value.split(".");

            // ONLY ONE DOT

            if (parts.length > 2) {

                value =
                    parts[0] +
                    "." +
                    parts.slice(1).join("");
            }

            // BLOCK VALUES BELOW 10

            if (
                value !== "" &&
                value !== "." &&
                parseFloat(value) < 10
            ) {

                input.value = "10.00";

                updateButton("10.00");

                return;
            }

            input.value = value;

            updateButton(value);

        });

        // =========================
        // INPUT BLUR
        // =========================

        input.addEventListener("blur", () => {

            let value = input.value;

            if (
                value === "" ||
                value === "."
            ) {

                input.value = "";

                investBtn.innerHTML = `
                    <div>
                        ${baseText}
                    </div>
                `;

                return;
            }

            let num =
                parseFloat(value);

            // MINIMUM ₦10

            if (num < 10) {

                num = 10;
            }

            input.value =
                formatMoney(num);

            updateButton(
                formatMoney(num)
            );

        });

        // =========================
        // INVEST BUTTON FIX
        // =========================

        investBtn.addEventListener("click", () => {

            alert("Investment placed!");

        });

    });

    // =========================
    // AVIATOR GRAPH SYSTEM
    // =========================

    const helicopter =
        document.getElementById("helicopter");

    const multiplier =
        document.querySelector(".multiplier");

    const flightPath =
        document.getElementById("flightPath");

    const fillArea =
        document.getElementById("fillArea");

    let x = 12;

    let y = 4;

    let multi = 1.00;

    let wave = 0;

    let upwardSpeed = 1.1;

    let points = [];

    // =========================
    // ANIMATION
    // =========================

    function animate() {

        // MOVE RIGHT

        x += 1.4;

        // INITIAL TAKEOFF

        if (x < 130) {

            y += upwardSpeed;
        }

        // NATURAL MOTION

        else {

            wave += 0.06;

            y +=
                upwardSpeed +
                Math.sin(wave) * 1.5;
        }

        // MULTIPLIER

        multi += 0.01;

        // HELICOPTER POSITION

        helicopter.style.left =
            x + "px";

        helicopter.style.bottom =
            y + "px";

        // MULTIPLIER DISPLAY

        multiplier.textContent =
            multi.toFixed(2) + "x";

        // =========================
        // GRAPH SYSTEM
        // =========================

        const svgY =
            320 - y;

        points.push({
            x: x + 25,
            y: svgY
        });

        // BUILD CURVE

        let linePath =
            `M 12 316`;

        points.forEach((point) => {

            linePath +=
                ` L ${point.x} ${point.y}`;
        });

        // DRAW LINE

        flightPath.setAttribute(
            "d",
            linePath
        );

        // BUILD FILLED AREA

        let fillPath =
            linePath +
            ` L ${x + 25} 316
              L 12 316 Z`;

        // DRAW FILLED AREA

        fillArea.setAttribute(
            "d",
            fillPath
        );

        // =========================
        // STOP
        // =========================

        if (x > 360 || y > 290) {

            clearInterval(loop);
        }
    }

    // =========================
    // START LOOP
    // =========================

    const loop =
        setInterval(animate, 30);

});