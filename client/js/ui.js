// -------------------------
// Render Gaming Cards
// -------------------------
export function renderGameCards(games) {

    const gamesContainer = document.getElementById("games-list");

    gamesContainer.innerHTML = "";

    games.forEach(game => {

        const card = document.createElement("div");

        card.className =
            "customer-card p-6 text-center";

        card.innerHTML = `
            <img
                src="assets/images/${game.name}.png"
                alt="${game.name}"
                class="w-full h-40 object-contain mb-4"
            >

            <h3 class="text-2xl font-bold text-amber-400">
                ${game.name}
            </h3>
        `;

        gamesContainer.appendChild(card);

    });

}

// -------------------------
// Populate Game Dropdown
// -------------------------
export function populateGameDropdown(games) {

    const select =
        document.getElementById("game");

    select.innerHTML =
        `<option value="">-- Choose Game --</option>`;

    games.forEach(game => {

        select.innerHTML += `
            <option value="${game.name}">
                ${game.name}
            </option>
        `;

    });

}


// -------------------------
// Show Message
// -------------------------
export function showMessage(message, type) {

    const formMessage =
        document.getElementById("form-message");

    formMessage.textContent = message;

    formMessage.className =
        `text-center p-4 rounded-lg ${
            type === "success"
                ? "bg-green-900/50 text-green-300"
                : "bg-red-900/50 text-red-300"
        }`;

    formMessage.classList.remove("hidden");

}

// -------------------------
// Reset Booking Form
// -------------------------
export function resetBookingForm() {

    document
        .getElementById("booking-form")
        .reset();

    document.getElementById(
        "price-estimate"
    ).textContent = "Rs. 0";

}


