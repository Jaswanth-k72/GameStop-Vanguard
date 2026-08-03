if (sessionStorage.getItem("admin") !== "true") {
    window.location.href = "admin-login.html";
}



import {
    getPendingBookings,
    getApprovedBookings,
    getActiveBookings,
    approveBooking,
    rejectBooking,
    startSession,
    completeSession,
    getHistory
} from "./adminApi.js";

import { initializeWalkIn }
from "./walkin.js";


let systems = [];
let pricing = [];


import {
    getSystems,
    getPricing,
} from "./api.js";  

import {
    renderPendingBookings,
    renderApprovedBookings,
    renderActiveSessions,
    renderHistory

} from "./adminUI.js";

document.addEventListener("DOMContentLoaded", async () => {


    systems = await getSystems();

    pricing = await getPricing();

    initializeWalkIn(systems, pricing);

    console.log("Walk-in initialized");

    loadDashboard();

    setInterval(loadDashboard, 5000);

    setInterval(updateTimers,1000);

    document
    .getElementById("logout-btn")
    .addEventListener("click", () => {

        sessionStorage.removeItem("admin");

        window.location.href = "admin-login.html";

    });

});

// ----------------------------
// Load Dashboard
// ----------------------------

async function loadDashboard() {

    console.log("Loading dashboard...");

    try {

        const pending = await getPendingBookings();

        const approved = await getApprovedBookings();

        const active = await getActiveBookings();

        renderPendingBookings(pending);

        renderApprovedBookings(approved);

        renderActiveSessions(active);

        registerEvents();
        const history = await getHistory();

renderHistory(history);

    } catch (err) {

        console.error("Dashboard Error:", err);

    }

}
// ----------------------------
// Register Buttons
// ----------------------------

function registerEvents() {

    // APPROVE

    document
        .querySelectorAll(".approve-btn")
        .forEach(btn => {

            btn.onclick = async () => {

                await approveBooking(
                    btn.dataset.id
                );

                loadDashboard();

            };

        });

    // REJECT

    document
        .querySelectorAll(".reject-btn")
        .forEach(btn => {

            btn.onclick = async () => {

                await rejectBooking(
                    btn.dataset.id
                );

                loadDashboard();

            };

        });

    // COMPLETE

    document
        .querySelectorAll(".complete-btn")
        .forEach(btn => {

            btn.onclick = async () => {

                if (!confirm(
                    "Complete this session?"
                )) return;

                await completeSession(
                    btn.dataset.id
                );

                loadDashboard();

            };

        });
    document
    .querySelectorAll(".start-btn")
    .forEach(btn => {

        btn.onclick = async () => {

            const payment_method =
                prompt(
                    "Payment Method (Cash / QR Payment)"
                );

            if (!payment_method)
                return;

            await startSession(

                btn.dataset.id,

                payment_method

            );

            loadDashboard();

        };

    });

}


function updateTimers(){

    document
    .querySelectorAll(".session-card")
    .forEach(card=>{

        const endTime =
            new Date(card.dataset.end);

        const timer =
            card.querySelector(".timer-display");

        const remaining =
            endTime - new Date();

        if(remaining<=0){

            timer.textContent="TIME OVER";

            card.classList.add("times-up");

            return;

        }

        const hours =
            Math.floor(remaining/3600000);

        const minutes =
            Math.floor(
                (remaining%3600000)/60000
            );

        const seconds =
            Math.floor(
                (remaining%60000)/1000
            );

        timer.textContent=
            `${String(hours).padStart(2,"0")}:`+
            `${String(minutes).padStart(2,"0")}:`+
            `${String(seconds).padStart(2,"0")}`;

    });

}