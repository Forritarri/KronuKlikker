// # Grunnbreytur
let gem = document.querySelector('.penge'); // # Heildarupphæð króna
let manualIncrement = 1; // # Hversu mikið bætist við fyrir handvirk clicks
let autoIncrement = 0; // # Heildaraukning frá autoclickers
let intervalId = null; // # Tímabilsauðkenni fyrir sjálfvirka söfnun

// # Uppfærslulistar (niður minnkuð áhrif og hækkaður kostnaður)
let autoClickers = [
    { name: "Gömul Dúfa. Kaupa gamla þjálfaða dúfu sem finnur Krónur og kemur með þær til þín.", cost: 1000, increment: 10 },
    { name: "Ódýr Þræll. Fyrir 5000 Kr. getur þú keypt aldraðan þræl frá Krónulandi sem safnar Krónum haanda þér.", cost: 5000, increment: 20 },
    { name: "", cost: 10000, increment: 50 },
    { name: "Ágætur Dróni. Fyrir 25.000 Kr. getur þú keypt Ágætan dróna, forritaður að finna 100 Kr. peninga og koma með þá til þín.", cost: 25000, increment: 100 },
    { name: "Starfsmaður. Þú ert orðin/n þekktur í Krónu-undirheimunum. Þar finnur þú starfsmann sem vill helga líf sitt að hjálpa þér, fyrir aðeins 50.000 Kr.", cost: 50000, increment: 200 },
    { name: "", cost: 125000, increment: 500 },
    { name: "", cost: 250000, increment: 1000 },
    { name: "", cost: 500000, increment: 2000 },
    { name: "", cost: 1_000_000, increment: 4000 },
    { name: "", cost: 2_500_000, increment: 10_000 },
    { name: "", cost: 5_000_000, increment: 20_000 },
    { name: "", cost: 12_500_000, increment: 50_000 },
    { name: "", cost: 25_000_000, increment: 100_000 },
    { name: "", cost: 50_000_000, increment: 200_000 },
    { name: "", cost: 125_000_000, increment: 500_000 },
    { name: "", cost: 250_000_000, increment: 1_000_000 },
    { name: "", cost: 500_000_000, increment: 2_000_000 },
    { name: "", cost: 1_000_000_000, increment: 4_000_000 },
    { name: "", cost: 2_500_000_000, increment: 10_000_000 },
    { name: "", cost: 5_000_000_000, increment: 20_000_000 },
    { name: "", cost: 12_500_000_000, increment: 50_000_000 },
    { name: "", cost: 25_000_000_000, increment: 100_000_000 },
    { name: "", cost: 50_000_000_000, increment: 200_000_000 },
    { name: "", cost: 125_000_000_000, increment: 500_000_000 },
    { name: "", cost: 250_000_000_000, increment: 1_000_000_000 },
    { name: "", cost: 500_000_000_000, increment: 2_000_000_000 },
    { name: "", cost: 1_000_000_000_000, increment: 4_000_000_000 },
    { name: "", cost: 2_500_000_000_000, increment: 10_000_000_000 },
    { name: "", cost: 5_000_000_000_000, increment: 20_000_000_000 },
    { name: "", cost: 12_500_000_000_000, increment: 50_000_000_000 },
    { name: "", cost: 25_000_000_000_000, increment: 100_000_000_000 },
    { name: "", cost: 50_000_000_000_000, increment: 200_000_000_000 },
    { name: "", cost: 125_000_000_000_000, increment: 500_000_000_000 },
    { name: "", cost: 250_000_000_000_000, increment: 1_000_000_000_000 },
    { name: "", cost: 500_000_000_000_000, increment: 2_000_000_000_000 },
    { name: "", cost: 1_000_000_000_000_000, increment: 4_000_000_000_000 },
    { name: "", cost: 2_500_000_000_000_000, increment: 10_000_000_000_000 },
    { name: "", cost: 5_000_000_000_000_000, increment: 20_000_000_000_000 },
    { name: "", cost: 12_500_000_000_000_000, increment: 50_000_000_000_000 },
    { name: "", cost: 25_000_000_000_000_000, increment: 100_000_000_000_000 },
    { name: "", cost: 50_000_000_000_000_000, increment: 200_000_000_000_000 },
    { name: "", cost: 125_000_000_000_000_000, increment: 500_000_000_000_000 },
    { name: "", cost: 250_000_000_000_000_000, increment: 1_000_000_000_000_000 },
    { name: "", cost: 500_000_000_000_000_000, increment: 2_000_000_000_000_000 },
    { name: "", cost: 1_000_000_000_000_000_000, increment: 4_000_000_000_000_000 },
];


let manualUpgrades = [
    { name: "Segulprik. Kaupa prik með segul límdan á enda priksins frá heimilislausum náunga, sem er kallaður Hákon Heimilislausi, til að hjálpa þér að safna Krónum.", cost: 100, increment: 1 },
    { name: "Betra Segulprik. Kaupa betri segul úr Bauhaus fyrir prikið þannig þú getur safnað fleiri Krónum.", cost: 500, increment: 3 },
    { name: "Ruslatöng með Segul. Kaupa ruslatöng með segul frá skuggalegum náunga sem er Kalli Króna.", cost: 2500, increment: 5 },
    { name: "Seðlapentari. Fyrir aðeins 10.000 Kr. getur þú keypt lélegan seðlaprentara frá Ímu (Íslenskt Temu).", cost: 10000, increment: 40 },
    { name: "Betri Seðlaprentari. Fyrir 50.000 Kr. getur þú keypt aðeins betri seðlaprentara frá Íslazon (Íslenskt Amazon).", cost: 50000, increment: 60 },
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
    const reward = 1000000; // Vinningur
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
