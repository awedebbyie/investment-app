document.addEventListener("DOMContentLoaded", () => {

    const rows = document.querySelectorAll(".invest-row");

    rows.forEach((row) => {

        const input = row.querySelector(".amount-input");
        const investBtn = row.querySelector(".invest-btn");
        const priceBtns = row.querySelectorAll(".price-btn");

        // 👉 QUICK PRICE BUTTONS
        priceBtns.forEach(btn => {

            btn.addEventListener("click", () => {

                let value = parseFloat(btn.textContent);

                input.value = value.toFixed(2);

                investBtn.innerHTML = `
                    <span>INVEST</span>
                    <small>(₦${value.toFixed(2)})</small>
                `;
            });
        });

        // 👉 INPUT VALIDATION (NO BLOCKING WHILE TYPING)
        input.addEventListener("input", () => {

            input.value = input.value.replace(/[^0-9.]/g, "");

            const parts = input.value.split(".");
            if (parts.length > 2) {
                input.value = parts[0] + "." + parts.slice(1).join("");
            }

            const num = parseFloat(input.value);

            if (!isNaN(num)) {
                investBtn.innerHTML = `
                    <span>INVEST</span>
                    <small>(₦${num})</small>
                `;
            }
        });

        // 👉 CLICK INVEST (FINAL CHECK HERE)
        investBtn.addEventListener("click", () => {

            const amount = parseFloat(input.value);

            if (isNaN(amount)) {
                alert("Enter amount");
                return;
            }

            if (amount < 10) {
                alert("Minimum investment is ₦10");
                return;
            }

            alert("Investment placed!");
        });

    });

});