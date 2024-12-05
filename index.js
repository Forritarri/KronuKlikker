let gem = document.querySelector('.penge');
let clickerCost = document.querySelector('.clickercost');
let level = document.querySelector('.level');
let clickerLevel = 0;
let upgradesPurchased = 0;  // Total number of upgrades
let intervalId = null;      // Interval to add points

function incrementGem() {
    gem.innerHTML = parseInt(gem.innerHTML) + 1;
}

function buyClicker() {
    let currentPoints = parseInt(gem.innerHTML);
    let cost = parseInt(clickerCost.innerHTML);

    if (currentPoints >= cost) {
        // Deduct points for upgrade
        gem.innerHTML = currentPoints - cost;

        // Increase the upgrade level
        clickerLevel += 1;
        level.innerHTML = `Level ${clickerLevel}`;

        // Increase the number of upgrades purchased
        upgradesPurchased += 1;

        // Update the cost for the next upgrade (optional)
        // clickerCost.innerHTML = cost + 10;  // Uncomment to increase the cost per upgrade

        // Calculate the new interval time based on the number of upgrades
        let intervalTime = 1000 / upgradesPurchased;

        // Start or update the interval to accumulate points
        if (!intervalId) {
            intervalId = setInterval(() => {
                gem.innerHTML = parseInt(gem.innerHTML) + 1;
                checkWinCondition();  // Check if points reached 100,000
            }, intervalTime);
        } else {
            // Clear the existing interval and restart with the updated interval
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                gem.innerHTML = parseInt(gem.innerHTML) + 1;
                checkWinCondition();  // Check if points reached 100,000
            }, intervalTime);
        }
    } else {

    }
}

// Function to check if the player has won by reaching 100,000 points
function checkWinCondition() {
    if (parseInt(gem.innerHTML) >= 100000) {
        clearInterval(intervalId);  // Stop accumulating points
        alert("Þú vinnur!");  // You win!
    }
}
