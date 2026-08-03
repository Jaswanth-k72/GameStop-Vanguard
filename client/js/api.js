const API_URL = "https://gamestop-vanguard.onrender.com";

// -------------------------
// GET Gaming Systems
// -------------------------
export async function getSystems() {
    const response = await fetch(`${API_URL}/systems`);

    if (!response.ok) {
        throw new Error("Failed to load gaming systems");
    }

    const result = await response.json();

    return result.data;
}

// -------------------------
// GET Pricing
// -------------------------
export async function getPricing() {
    const response = await fetch(`${API_URL}/pricing`);

    if (!response.ok) {
        throw new Error("Failed to load pricing");
    }

    const result = await response.json();

    return result.data;
}

// -------------------------
// CREATE Booking
// -------------------------
export async function createBooking(bookingData) {

    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    });

    const result = await response.json();

    return result;
}

// -------------------------
// GET All Bookings
// (For Admin Dashboard)
// -------------------------
export async function getBookings() {

    const response = await fetch(`${API_URL}/bookings`);

    const result = await response.json();

    return result.data;
}
