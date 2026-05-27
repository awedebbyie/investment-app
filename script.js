document.addEventListener("DOMContentLoaded", () => {

    const rows = document.querySelectorAll(".invest-row");

    rows.forEach((row) => {

        const input = row.querySelector(".amount-input");
        const investBtn = row.querySelector(".invest-btn");
        const priceBtns = row.querySelectorAll(".price-btn");

        const baseText = "INVEST";

        // FORMAT MONEY
        function formatMoney(value) {

            let num = parseFloat(value);

            if (isNaN(num)) return "";

            return num.toFixed(2);
        }

        // UPDATE BUTTON
        function updateButton(value) {

            if (
                value === "" ||
                value === "." ||
                isNaN(parseFloat(value))
            ) {
                investBtn.textContent = baseText;
                return;
            }

            investBtn.textContent =
                `${baseText} (${value})`;
        }

        // QUICK BUTTONS
        priceBtns.forEach(btn => {

            btn.addEventListener("click", () => {

                let value = parseFloat(btn.textContent);

                if (value < 10) {
                    alert("Minimum investment is ₦10.00");
                    return;
                }

                input.value = formatMoney(value);

                updateButton(formatMoney(value));

            });

        });

        // NORMAL TYPING
        input.addEventListener("input", () => {

            let value = input.value;

            // remove invalid chars
            value = value.replace(/[^0-9.]/g, "");

            // only ONE decimal point
            const parts = value.split(".");

            if (parts.length > 2) {
                value = parts[0] + "." + parts.slice(1).join("");
            }

            input.value = value;

            // IMPORTANT:
            // do NOT auto-add .00 while typing
            updateButton(value);

        });

        // AFTER USER FINISHES TYPING
        input.addEventListener("blur", () => {

            let value = input.value;

            if (
                value === "" ||
                value === "."
            ) {
                input.value = "";
                investBtn.textContent = baseText;
                return;
            }

            let num = parseFloat(value);

            if (isNaN(num)) {
                input.value = "";
                investBtn.textContent = baseText;
                return;
            }

            // MINIMUM CHECK
            if (num < 10) {

                alert("Minimum investment is ₦10.00");

                num = 10;
            }

            // ONLY add .00 AFTER typing complete
            input.value = formatMoney(num);

            updateButton(formatMoney(num));

        });

        // INVEST CLICK
        investBtn.addEventListener("click", () => {

            let num = parseFloat(input.value);

            if (isNaN(num)) {
                alert("Enter amount");
                return;
            }

            if (num < 10) {
                alert("Minimum investment is ₦10.00");
                return;
            }

            input.value = formatMoney(num);

            updateButton(formatMoney(num));

            alert("Invested ₦" + formatMoney(num));

        });

    });

});