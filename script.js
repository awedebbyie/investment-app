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

        // FORMAT MONEY

        function formatMoney(value) {

            let num = parseFloat(value);

            if (isNaN(num)) return "";

            return num.toFixed(2);
        }

        // UPDATE BUTTON TEXT

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

        // QUICK PRICE BUTTONS

        priceBtns.forEach((btn) => {

            btn.addEventListener("click", () => {

                let value =
                    parseFloat(btn.textContent);

                input.value =
                    formatMoney(value);

                updateButton(
                    formatMoney(value)
                );

            });

        });

        // INPUT TYPING

        input.addEventListener("input", () => {

            let value = input.value;

            // ALLOW ONLY NUMBERS + ONE DOT

            value =
                value.replace(/[^0-9.]/g, "");

            const parts = value.split(".");

            if (parts.length > 2) {

                value =
                    parts[0] +
                    "." +
                    parts.slice(1).join("");
            }

            input.value = value;

            updateButton(value);

        });

        // INPUT FINISHING

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
        // INVEST BUTTON CLICK
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

    // STARTING PATH

    let path =
        `M ${x + 25} ${320 - y}`;

    // ANIMATION FUNCTION

    function animate() {

        // MOVEMENT

        x += 1.2;

        y += 0.7;

        // MULTIPLIER

        multi += 0.01;

        // UPDATE HELICOPTER POSITION

        helicopter.style.left =
            x + "px";

        helicopter.style.bottom =
            y + "px";

        // UPDATE MULTIPLIER TEXT

        multiplier.textContent =
            multi.toFixed(2) + "x";

        // DRAW CURVE

        path +=
            ` L ${x + 25} ${320 - y}`;

        flightPath.setAttribute(
            "d",
            path
        );
    }

    // RUN MOVEMENT

    setInterval(animate, 30);

});