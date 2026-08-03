import { createWalkIn } from "./adminApi.js";
let systemsData = [];
let pricingData = [];

let gameSelect;
let playersSelect;
let durationSelect;
let priceInput;

let playersWrapper;
let durationWrapper;

export function initializeWalkIn(systems, pricing) {

    systemsData = systems;
    pricingData = pricing;

    gameSelect = document.getElementById("walk-in-game");
    playersSelect = document.getElementById("walk-in-players");
    durationSelect = document.getElementById("walk-in-duration");
    priceInput = document.getElementById("walk-in-price");

    playersWrapper = document.getElementById("walk-in-players-wrapper");
    durationWrapper = document.getElementById("walk-in-duration-wrapper");

    loadSystems();

    gameSelect.addEventListener("change", gameChanged);

    playersSelect.addEventListener("change", updatePrice);

    durationSelect.addEventListener("change", updatePrice);

    document
    .getElementById("walk-in-form")
    .addEventListener("submit", submitWalkIn);

}

function loadSystems() {

    gameSelect.innerHTML =
        `<option value="">Select Game</option>`;

    systemsData.forEach(system => {

        gameSelect.innerHTML += `
            <option value="${system.id}">
                ${system.name}
            </option>
        `;

    });

}


function gameChanged() {

    const system = systemsData.find(

        s => s.id === gameSelect.value

    );

    if (!system) return;

    loadPlayers(system);

    loadDurations(system);

    updatePrice();

}


function loadPlayers(system){

    playersSelect.innerHTML="";

    for(let i=1;i<=system.max_players;i++){

        playersSelect.innerHTML +=
        `<option value="${i}">
            ${i} Player
        </option>`;

    }

    playersWrapper.classList.remove("hidden");

}

function loadDurations(system) {

    durationSelect.innerHTML = "";

    let durations = [];

    if (system.pricing_type === "hourly") {

        durations = [
            30, 60, 90, 120,
            150, 180, 210, 240
        ];

    }
    else if (system.name === "Racing Simulator") {

        durations = [30, 60];

    }
    else if (system.name === "Meta Quest 3") {

        durations = [15, 30];

    }

    durations.forEach(duration => {

        durationSelect.innerHTML += `
            <option value="${duration}">
                ${formatDuration(duration)}
            </option>
        `;

    });

    durationWrapper.classList.remove("hidden");

}

function updatePrice() {

    const system = systemsData.find(

        s => s.id === gameSelect.value

    );

    if (!system) return;

    const total = calculatePrice(

        system,

        playersSelect.value,

        durationSelect.value

    );

    priceInput.value = total;

}

function calculatePrice(system, players, duration) {

    if (system.pricing_type === "hourly") {

        const hourly = pricingData.find(p =>

            p.system_id === system.id &&
            Number(p.players) === Number(players) &&
            Number(p.duration) === 60

        );

        if (!hourly) return 0;

        const hourlyPrice = Number(hourly.price);

        if (Number(duration) === 30) {
            return Math.round(hourlyPrice / 2) + 10;
        }

        return hourlyPrice * (Number(duration) / 60);
    }

    const fixed = pricingData.find(p =>

        p.system_id === system.id &&
        Number(p.players) === Number(players) &&
        Number(p.duration) === Number(duration)

    );

    return fixed ? fixed.price : 0;

}


function formatDuration(minutes) {

    switch (Number(minutes)) {

        case 15:
            return "15 Minutes";

        case 30:
            return "30 Minutes";

        case 60:
            return "1 Hour";

        case 90:
            return "1 Hour 30 Minutes";

        case 120:
            return "2 Hours";

        case 150:
            return "2 Hours 30 Minutes";

        case 180:
            return "3 Hours";

        case 210:
            return "3 Hours 30 Minutes";

        case 240:
            return "4 Hours";

        default:
            return `${minutes} Minutes`;

    }

}

async function submitWalkIn(e) {

    e.preventDefault();

    const system = systemsData.find(
        s => s.id === gameSelect.value
    );

    const result = await createWalkIn({

        customer_name:
            document.getElementById("walk-in-name").value,

        system:
            system.name,

        players:
            playersSelect.value,

        duration:
            durationSelect.value,

        price:
            priceInput.value,

        payment_method:
            document.getElementById("walk-in-payment").value

    });

    if (result.success) {

        alert("Walk-in session started successfully!");

        document
            .getElementById("walk-in-form")
            .reset();

        playersWrapper.classList.add("hidden");
        durationWrapper.classList.add("hidden");

        location.reload();

    } else {

        alert(result.message);

    }

}