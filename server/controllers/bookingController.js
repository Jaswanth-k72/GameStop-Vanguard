import supabase from "../config/supabase.js";
import { calculatePrice } from "../services/pricingService.js";

export async function createBooking(req, res) {

    try {

        const {
            customer_name,
            phone,
            booking_date,
            booking_time,
            system,
            players,
            duration
        } = req.body;

        // Backend calculates price
        const price = await calculatePrice(
            system,
            Number(players),
            Number(duration)
        );

        const { data, error } = await supabase
            .from("bookings")
            .insert([{
                customer_name,
                phone,
                booking_date,
                booking_time,
                system,
                players,
                duration,
                price,
                status: "Pending"
            }])
            .select();

        if (error) {
            throw error;
        }

        res.status(201).json({
            success: true,
            booking: data[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}