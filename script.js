function loadingDots() {
    var dots = 0;
    var loadingText = document.getElementById("loading-text");
    dotsInterval = setInterval(function() {
        loadingText.textContent = "Loading" + Array(dots % 4).fill('.').join('');
        dots = (dots + 1) % 4;
    }, 500);
}


function load() {
    loadingDots();

    var bar = document.getElementById("loading-bar");
    document.getElementById("to-hide").style.display = "none";
    document.getElementById("loading-screen").style.display = "block";
    var width = 1;
    var part1 = setInterval(function() {
        if (width < 75) {
            width += 1;
        } else if (width < 90) {
            width += 0.5;
        } else if (width < 97) {
            width += 0.2;
        } else {
            clearInterval(part1);
            clearInterval(dotsInterval);
            part2();
        }
        bar.style.width = width + '%';
    }, 100);

    function part2() {

        var textChangeCounter = 0;
        var part2 = setInterval(function() {
            var randomChange = 0;
            if (width > 90) {
                randomChange = Math.random() < 0.7 ? -Math.random() : Math.random();
            } else if (width > 80) {
                randomChange = Math.random() < 0.6 ? -Math.random() : Math.random();
            } else if (width > 60) {
                randomChange = Math.random() < 0.55 ? -Math.random() : Math.random();
                randomChange *= 2;
            } else if (width > 40) {
                randomChange = Math.random() < 0.5 ? -Math.random() : Math.random();
                randomChange *= 3;
            } else if (width > 20) {
                randomChange = Math.random() < 0.45 ? -Math.random() : Math.random();
                randomChange = 1-randomChange;
                randomChange *= 2;
            } else if (width > 10) {
                randomChange = Math.random() < 0.4 ? -Math.random() : Math.random();
                randomChange = 1-randomChange;
            } else {
                randomChange = Math.random() < 0.3 ? -Math.random() : Math.random();
            }

            width += randomChange;
            if (width > 99) width = 99; // Cap at 99%
            if (width < 1) width = 1; // Cap at 1% - Prevents going negative
            bar.style.width = width + '%';

            if (textChangeCounter % 3 === 0) {
                var loadingTextVariations = [
                    "Loading", "Loading.", "Loading..", "Loading...", "Loading .",
                    "Loading. .", "Loading ..", "Loading  .", ".Loading", "Load.ing",
                    "Laodnig...", "L.oading", "Loaaaaading", "Loading................"
                ];

                var randomIndex = Math.floor(Math.random() * loadingTextVariations.length);
                var selectedText = loadingTextVariations[randomIndex];
                document.getElementById("loading-text").innerText = selectedText;
            }
            textChangeCounter++;
        }, 100);
    }
}