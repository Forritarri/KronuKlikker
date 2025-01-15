let gem = document.querySelector('.penge');
let clickerCost = document.querySelector('.clickercost');
let level = document.querySelector('.level');

let clickerLevel = 0; // Upphafsstig uppfærslna
let incrementAmount = 0; // Hversu mikið bætist við á hverju tímabili
let baseCost = 10; // Fastur kostnaður fyrir hverja uppfærslu
let intervalId = null;

function incrementGem() {
    gem.innerHTML = parseInt(gem.innerHTML) + 1;
}

function buyClicker() {
    let currentPoints = parseInt(gem.innerHTML);
    let cost = parseInt(clickerCost.innerHTML);

    if (currentPoints >= cost) {
        // Draga frá kostnaði og auka hraða sjálfvirkrar söfnunar
        gem.innerHTML = currentPoints - cost;
        clickerLevel += 1;
        incrementAmount = clickerLevel; // Hvert stig gefur +1/sek
        level.innerHTML = `Level ${clickerLevel}`;

        // Byrja eða uppfæra sjálfvirka söfnun
        startInterval();
    }
}

function startInterval() {
    if (intervalId) clearInterval(intervalId); // Stöðva gamla tímabilið ef það er til

    if (incrementAmount > 0) {
        intervalId = setInterval(() => {
            gem.innerHTML = parseInt(gem.innerHTML) + incrementAmount;
            checkWinCondition();
        }, 1000); // Uppfært á 1 sekúndu fresti
    }
}

function checkWinCondition() {
    if (parseInt(gem.innerHTML) >= 100000) {
        clearInterval(intervalId);
        alert("Þú vinnur!");
    }
}
