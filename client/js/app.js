


import { getSystems, getPricing } from "./api.js";
import {
    renderGameCards,
    populateGameDropdown
} from "./ui.js";

import { calculateEstimatedPrice } from "./pricing.js";
import { submitBooking } from "./booking.js";

let systems = [];
let pricing = [];

document.addEventListener("DOMContentLoaded", async () => {

    try {

        // Load systems
        systems = await getSystems();

        renderGameCards(systems);

        populateGameDropdown(systems);

        // Load pricing
        pricing = await getPricing();

        // Initialize page
        populateTimeDropdown();
        setMinimumDate();

        // Events
        document
            .getElementById("game")
            .addEventListener("change", updateForm);

        document
            .getElementById("players")
            .addEventListener("change", updatePrice);

        document
            .getElementById("duration")
            .addEventListener("change", updatePrice);

        document
            .getElementById("booking-form")
            .addEventListener("submit", async (e) => {

                e.preventDefault();

                await submitBooking();

            });

    } catch (error) {

        console.error(error);

    }

});

function updateForm() {

    const system = systems.find(

        s => s.id === document.getElementById("game").value

    );

    const players =
        document.getElementById("players");

    const duration =
        document.getElementById("duration");

    players.innerHTML = "";
    duration.innerHTML = "";

    if (!system)
        return;

    // ---------- Players ----------

    for (let i = 1; i <= system.max_players; i++) {

        players.innerHTML += `
            <option value="${i}">
                ${i}
            </option>
        `;

    }

    // ---------- Duration ----------

    let durationOptions = [];

    if (system.pricing_type === "hourly") {

        durationOptions = [
            30, 60, 90, 120,
            150, 180, 210, 240
        ];

    }
    else if (system.name === "Racing Simulator") {

        durationOptions = [30, 60];

    }
    else if (system.name === "Meta Quest 3") {

        durationOptions = [15, 30];

    }

    durationOptions.forEach(d => {

        duration.innerHTML += `
            <option value="${d}">
                ${formatDuration(d)}
            </option>
        `;

    });

    players.disabled = false;
    duration.disabled = false;

    updatePrice();

}
function updatePrice() {

    const total =
        calculateEstimatedPrice(
            systems,

            pricing,

            document.getElementById("game").value,

            document.getElementById("players").value,

            document.getElementById("duration").value

        );

    document.getElementById(
        "price-estimate"
    ).textContent =
        `Rs. ${total}`;

}

function populateTimeDropdown() {

    const select =
        document.getElementById("time");

    for (let h = 10; h < 22; h++) {

        ["00","30"].forEach(min => {

            const value =
                `${String(h).padStart(2,"0")}:${min}`;

            const option =
                document.createElement("option");

            option.value = value;

            option.textContent =
                value;

            select.appendChild(option);

        });

    }

}

function setMinimumDate() {

    const today =
        new Date();

    const yyyy =
        today.getFullYear();

    const mm =
        String(today.getMonth()+1)
        .padStart(2,"0");

    const dd =
        String(today.getDate())
        .padStart(2,"0");

    document
        .getElementById("date")
        .min =
        `${yyyy}-${mm}-${dd}`;

}

function formatDuration(minutes){

    if(minutes==30)
        return "30 Minutes";

    if(minutes==60)
        return "1 Hour";

    if(minutes==90)
        return "1 Hour 30 Minutes";

    if(minutes==120)
        return "2 Hours";

    if(minutes==150)
        return "2 Hours 30 Minutes";

    if(minutes==180)
        return "3 Hours";

    if(minutes==210)
        return "3 Hours 30 Minutes";

    if(minutes==240)
        return "4 Hours";

    if(minutes==15)
        return "15 Minutes";

    return `${minutes} Minutes`;

}