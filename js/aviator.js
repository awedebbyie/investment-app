let crashed =false;
let loop;
document.addEventListener("DOMContentLoaded", () => {

    const helicopter = document.getElementById("helicopter");
    const multiplier = document.querySelector(".multiplier");
    const flightPath = document.getElementById("flightPath");
    const fillArea = document.getElementById("fillArea");

    let x = 0;
    let y = 320;

    let multiplierValue = 1;
    let crashed = false;

    function animate() {
        if (x < 260) {
            x += 2.2;
            y -= 1.25;
        
        } else if (!crashed) {
        
            x += 1.6;
            y += (Math.random() - 0.5) * 12;
        
            if (y < 80) y = 80;
            if (y > 320) y = 320;
        
            if (x > 340) {
                crashed = true;
            }
        
        } else {
        
            x += 2;
            y += 5;
        
            if (y > 340) {
                crashed = true;
                clearInterval(loop);
                return;
            }
        }
        if (!crashed) {
            multiplierValue += 0.01;
        
            multiplier.textContent =
                multiplierValue.toFixed(2) + "x";
        }
        if (helicopter) {
            helicopter.style.left = x + "px";
            helicopter.style.bottom = (320 - y) + "px";
        }


        const path = `M 0 320 L ${x} ${y}`;

        flightPath.setAttribute("d", path);

        fillArea.setAttribute("d",
            path + ` L ${x + 25} 320 L 0 320 Z`
        );
    }

    loop = setInterval(animate, 30);

});