// # Grunnbreytur
let gem = document.querySelector('.penge'); // # Heildarupphæð króna
let manualIncrement = 1; // # Hversu mikið bætist við fyrir handvirk clicks
let autoIncrement = 0; // # Heildaraukning frá autoclickers
let intervalId = null; // # Tímabilsauðkenni fyrir sjálfvirka söfnun

// # Uppfærslulistar (niður minnkuð áhrif og hækkaður kostnaður)
let autoClickers = [
    { name: "Plata krakka til þess að hjálpa þér", cost: 50, increment: 1 },
    { name: "Plata heimilislausa til þess að hjálpa þér", cost: 250, increment: 5 },
    { name: "Plata fólk til þess að hjálpa þér", cost: 1000, increment: 10 },
    { name: "Kaupa lélega peningavél", cost: 10000, increment: 50 },
    { name: "Krónu-finnandi drónar", cost: 50000, increment: 100 },
    { name: "Walter Krónu White til að framleiða Krónur", cost: 125000, increment: 500 },
    { name: "Ástþór Magnússon stofnar ólöglegan Krónubransa", cost: 250000, increment: 1000 },
    { name: "Guðni Th. byrjar að framleiða Krónur", cost: 500000, increment: 1500 },
    { name: "Byggja Krónu-verksmiðju uppi á hálendi", cost: 1000000, increment: 10000 },
];

let manualUpgrades = [
    { name: "Opna augun", cost: 100, increment: 1 },
    { name: "Gramsa í ruslinu", cost: 500, increment: 3 },
    { name: "Segull", cost: 2500, increment: 5 },
    { name: "Vélmenni", cost: 10000, increment: 40 },
    { name: "Blessun Jesú Krists", cost: 50000, increment: 60 },
];

// # Handvirkur smellur
function incrementGem() {
    gem.innerHTML = parseFloat(gem.innerHTML) + manualIncrement; // # Nota float fyrir nákvæmni
}

// # Kaupa autoclicker
function buyAutoClicker(index) {
    let currentPoints = parseFloat(gem.innerHTML);
    let clicker = autoClickers[index];

    if (currentPoints >= clicker.cost) {
        gem.innerHTML = currentPoints - clicker.cost; // # Draga frá kostnaði
        autoIncrement += clicker.increment; // # Auka heildar autoclicking hraða
        clicker.cost = Math.ceil(clicker.cost * 1.15); // # Hækka kostnað meira
        updateShop(); // # Uppfæra viðmót
        startAutoClicking(); // # Tryggja sjálfvirk söfnun
    }
}

// # Kaupa manual upgrade
function buyManualUpgrade(index) {
    let currentPoints = parseFloat(gem.innerHTML);
    let upgrade = manualUpgrades[index];

    if (currentPoints >= upgrade.cost) {
        gem.innerHTML = currentPoints - upgrade.cost; // # Draga frá kostnaði
        manualIncrement += upgrade.increment; // # Auka hversu mikið hver click gefur
        manualUpgrades.splice(index, 1); // # Fjarlægja þessa uppfærslu úr lista
        updateShop(); // # Uppfæra viðmót
    }
}

// # Byrjar sjálfvirka söfnun
function startAutoClicking() {
    if (intervalId) clearInterval(intervalId); // # Hreinsa gamla tímabilið ef til

    if (autoIncrement > 0) {
        intervalId = setInterval(() => {
            gem.innerHTML = (parseFloat(gem.innerHTML) + autoIncrement).toFixed(2); // # Nota float og takmarka á tvær aukastafir
        }, 1000); // # Uppfærsla á 1 sekúndu fresti
    }
}

// # Uppfæra verslun viðmót
function updateShop() {
    // # Uppfæra autoclicker búð
    document.querySelector('.autoclicker-shop').innerHTML = autoClickers
        .map((clicker, index) => `
            <div class="upgrade" onclick="buyAutoClicker(${index})">
                <h4>${clicker.name}</h4>
                <p>Verð: ${clicker.cost}</p>
                <p>Krónur: +${clicker.increment} / sek</p>
            </div>
        `).join('');

    // # Uppfæra manual upgrade búð
    document.querySelector('.manual-shop').innerHTML = manualUpgrades
        .map((upgrade, index) => `
            <div class="upgrade" onclick="buyManualUpgrade(${index})">
                <h4>${upgrade.name}</h4>
                <p>Verð: ${upgrade.cost}</p>
                <p>Hvern smellur: +${upgrade.increment}</p>
            </div>
        `).join('');
}

// # Upphafskall
updateShop();







document.getElementById("play-btn").addEventListener("click", () => {
    let currentPoints = parseFloat(gem.innerHTML); // Númer af núverandi krónur
    const cost = 100; // Kostnaður fyrir leikinn
    const reward = 100000; // Vinningur
    const resultElement = document.getElementById("result"); // Staða niðurstaðna

    if (currentPoints >= cost) {
        gem.innerHTML = currentPoints - cost; // Draga frá kostnað

        if (Math.random() < 0.01) { // 1% líkur á sigri
            gem.innerHTML = parseFloat(gem.innerHTML) + reward; // Bæta við vinning
            resultElement.innerHTML = "Til hamingju! Þú vannst 1000 krónur! 🎉";
            resultElement.style.color = "green";
        } else {
            resultElement.innerHTML = "Því miður, þú tapaðir 100 krónum. Prófaðu aftur! 😞";
            resultElement.style.color = "red";
        }
    } else {
        resultElement.innerHTML = "Þú átt ekki nóg af krónum til að spila. Safnaðu meira! 🙃";
        resultElement.style.color = "orange";
    }
});
