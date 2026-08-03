const API = "https://gamestop-vanguard.onrender.com";

// Pending
export async function getPendingBookings() {

    const res = await fetch(
        `${API}/bookings?status=Pending`
    );

    const result = await res.json();

    return result.data;
}

// Active
export async function getActiveBookings() {

    const res = await fetch(
        `${API}/bookings?status=Active`
    );

    const result = await res.json();

    return result.data;
}

// Approve
export async function approveBooking(id) {

    const res = await fetch(

        `${API}/bookings/${id}/approve`,

        {
            method: "PATCH"
        }

    );

    return await res.json();

}

// Reject
export async function rejectBooking(id) {

    const res = await fetch(

        `${API}/bookings/${id}/reject`,

        {
            method: "PATCH"
        }

    );

    return await res.json();

}

// Start
export async function startSession(
    id,
    payment_method
) {

    const res = await fetch(

        `${API}/bookings/${id}/start`,

        {

            method: "PATCH",

            headers: {

                "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

                payment_method

            })

        }

    );

    return await res.json();

}

// Complete
export async function completeSession(id) {

    const res = await fetch(

        `${API}/bookings/${id}/complete`,

        {
            method: "PATCH"
        }

    );

    return await res.json();

}

// Approved
export async function getApprovedBookings() {

    const res = await fetch(
        `${API}/bookings?status=Approved`
    );

    const result = await res.json();

    return result.data || [];

}

export async function getHistory() {

    const res = await fetch(
        `${API}/bookings/history`
    );

    const result = await res.json();

    return result.data;

}

export async function createWalkIn(data) {

    const res = await fetch(

        `${API}/bookings/walkin`,

        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        }

    );

    return await res.json();

}
