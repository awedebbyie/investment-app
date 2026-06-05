document.addEventListener("DOMContentLoaded", () => {

    const helicopter = document.getElementById("helicopter");
    const multiplier = document.querySelector(".multiplier");
    const flightPath = document.getElementById("flightPath");
    const fillArea = document.getElementById("fillArea");

    let x = 0;
    let y = 320;
    let wave = 0;
    let multiplierValue = 1;
    let points = [];
    let crashed = false;

    function animate() {

        if (x < 260) {
            x += 2.2;
            y -= 1.25;

        } else if (!crashed) {

            wave += 0.05;
            x += 1.6;
            y += Math.sin(wave) * 2.4;

            if (x > 340) crashed = true;

        } else {

            x += 2;
            y += 5;
        }

        multiplierValue += 0.01;

        multiplier.textContent = multiplierValue.toFixed(2) + "x";

        helicopter.style.left = x + "px";
        helicopter.style.bottom = (320 - y) + "px";

        points.push({ x: x + 10, y: y - 9 });

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

        flightPath.setAttribute("d", path);

        fillArea.setAttribute("d",
            path + ` L ${x + 25} 320 L 0 320 Z`
        );
    }

    setInterval(animate, 30);

});