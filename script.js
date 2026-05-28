document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // INVEST SYSTEM
    // =========================

    const rows = document.querySelectorAll(".invest-row");

    rows.forEach((row) => {

        const input = row.querySelector(".amount-input");

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
        // UPDATE BUTTON TEXT
        // =========================

        function updateButton(value) {

            if (
                value === "" ||
                value === "." ||
                isNaN(parseFloat(value))
            ) {

                investBtn.innerHTML = baseText;

                return;
            }

            investBtn.innerHTML = `
                <div>${baseText}</div>

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
        // INPUT TYPING
        // =========================

        input.addEventListener("input", () => {

            let value = input.value;

            // ALLOW ONLY NUMBERS + ONE DOT

            value =
                value.replace(/[^0-9.]/g, "");

            const parts = value.split(".");

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

                investBtn.innerHTML =
                    baseText;

                return;
            }

            let num =
                parseFloat(value);

            // MINIMUM ₦10.00

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
        // INVEST CLICK
        // =========================

        investBtn.addEventListener("click", () => {

            alert("Investment placed!");

        });

    });

    // =========================
    // HELICOPTER SYSTEM
    // =========================

    const helicopter =
        document.getElementById("helicopter");

    const multiplier =
        document.querySelector(".multiplier");

    const flightPath =
        document.getElementById("flightPath");

    let x = 12;

    let y = 4;

    let multi = 1.00;

    let wave = 0;

    let upwardSpeed = 1.1;

    // =========================
    // START PATH
    // =========================

    let path =
        `M ${x + 25} ${320 - y}`;

    // =========================
    // ANIMATION
    // =========================

    function animate() {

        // MOVE RIGHT

        x += 1.4;

        // FIRST PHASE
        // DIAGONAL TAKEOFF

        if (x < 140) {

            y += upwardSpeed;
        }

        // SECOND PHASE
        // NATURAL MOTION

        else {

            wave += 0.06;

            y +=
                upwardSpeed +
                Math.sin(wave) * 1.5;
        }

        // MULTIPLIER

        multi += 0.01;

        // POSITION

        helicopter.style.left =
            x + "px";

        helicopter.style.bottom =
            y + "px";

        // MULTIPLIER DISPLAY

        multiplier.textContent =
            multi.toFixed(2) + "x";

        // CURVED GRAPH

        path +=
            ` Q ${x - 5} ${320 - y}
               ${x + 8} ${320 - y}`;

        flightPath.setAttribute(
            "d",
            path
        );

        // STOP BEFORE EDGE

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