import { createBooking } from "./api.js";
import {
    showMessage,
    resetBookingForm,
} from "./ui.js";

export async function submitBooking() {

    const submitBtn =
        document.getElementById("submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {

        const booking = {

            customer_name:
                document.getElementById("name").value,

            phone:
                document.getElementById("phone").value,

            booking_date:
                document.getElementById("date").value,

            booking_time:
                document.getElementById("time").value,

            system:
                document.getElementById("game").value,

            players: Number(
                document.getElementById("players").value
            ),

            duration: Number(
                document.getElementById("duration").value
            )

        };

        const result =
            await createBooking(booking);

        if (result.success) {

            showMessage(
                "✅ Booking request sent successfully!",
                "success"
            );

            resetBookingForm();

        } else {

            showMessage(
                result.message,
                "error"
            );

        }

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to connect to server.",
            "error"
        );

    }

    submitBtn.disabled = false;
    submitBtn.textContent =
        "Send Booking Request";

}