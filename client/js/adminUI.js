// -------------------------------
// Render Pending Bookings
// -------------------------------

export function renderPendingBookings(bookings) {

    const container =
        document.getElementById(
            "pending-bookings-list"
        );

    if (!bookings.length) {

        container.innerHTML = `
            <p class="text-gray-500 text-center py-8">
                No pending bookings.
            </p>
        `;

        return;

    }

    container.innerHTML = bookings.map(b => `

        <div class="bg-gray-700 p-4 rounded-lg">

            <div class="flex justify-between">

                <div>

                    <h3 class="font-bold text-white">
                        ${b.customer_name}
                    </h3>

                    <p class="text-gray-300">
                        ${b.phone}
                    </p>

                    <p class="text-indigo-300">

                        ${b.system}

                        •

                        ${b.players} Player(s)

                        •

                        ${b.duration} mins

                    </p>

                </div>

                <div class="text-right">

                    <p class="text-green-400 font-bold">

                        ₹${b.price}

                    </p>

                </div>

            </div>

            <div class="flex gap-2 mt-4">

                <button
                    class="approve-btn admin-btn admin-btn-success flex-1"
                    data-id="${b.id}"
                >
                    Approve
                </button>

                <button
                    class="reject-btn admin-btn admin-btn-danger flex-1"
                    data-id="${b.id}"
                >
                    Reject
                </button>

            </div>

        </div>

    `).join("");

}


// -------------------------------
// Render Active Sessions
// -------------------------------

export function renderActiveSessions(
    sessions
) {

    const container =
        document.getElementById(
            "active-sessions-list"
        );

    if (!sessions.length) {

        container.innerHTML = `
            <p class="text-gray-500 text-center py-8">
                No Active Sessions.
            </p>
        `;

        return;

    }

    container.innerHTML = sessions.map(s => `

        <div
            class="admin-card p-4 session-card"
            data-id="${s.id}"
            data-end="${s.end_time}"
        >

            <div class="flex justify-between">

                <div>

                    <h3 class="text-xl font-bold">

                        ${s.customer_name}

                    </h3>

                    <p>

                        ${s.system}

                    </p>

                </div>

                <div>

                   <p
    class="timer-display
           text-2xl
           font-bold"
>
    Loading...
</p>

                </div>

            </div>

            <div class="mt-4">

                <button

                    class="complete-btn
                           admin-btn
                           admin-btn-danger
                           w-full"

                    data-id="${s.id}"

                >

                    Complete Session

                </button>

            </div>

        </div>

    `).join("");

}

export function renderApprovedBookings(bookings) {

    const container =
        document.getElementById(
            "approved-bookings-list"
        );

    if (!bookings.length) {

        container.innerHTML = `
            <p class="text-gray-500 text-center py-8">
                No approved bookings.
            </p>
        `;

        return;

    }

    container.innerHTML = bookings.map(b => `

        <div class="bg-gray-700 p-4 rounded-lg">

            <div class="flex justify-between">

                <div>

                    <h3 class="font-bold text-white">
                        ${b.customer_name}
                    </h3>

                    <p>${b.system}</p>

                    <p>
                        ${b.players} Player(s)
                        •
                        ${b.duration} mins
                    </p>

                </div>

                <div>

                    <button

                        class="start-btn
                               admin-btn
                               admin-btn-success"

                        data-id="${b.id}"

                    >

                        Start Session

                    </button>

                </div>

            </div>

        </div>

    `).join("");

}



export function renderHistory(history) {

    const container =
        document.getElementById("history-list");

    if (!history.length) {

        container.innerHTML = `
            <p class="text-gray-500">
                No History
            </p>
        `;

        return;

    }

    container.innerHTML = `

<table class="w-full text-sm">

<thead class="text-left border-b border-gray-600">

<tr>

<th class="py-2">Customer</th>
<th>Type</th>
<th>System</th>
<th>Payment</th>
<th>Amount</th>
<th>Status</th>

</tr>

</thead>

<tbody>

${history.map(h=>`

<tr class="border-b border-gray-700">

<td class="py-3">${h.customer_name}</td>

<td>${h.booking_type ?? "-"}</td>

<td>${h.system}</td>

<td>${h.payment_method ?? "-"}</td>

<td class="text-green-400">

₹${h.price}

</td>

<td>${h.status}</td>

</tr>

`).join("")}

</tbody>

</table>

`;

}