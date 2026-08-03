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
                booking_type: "Online",
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

export async function getBookings(req, res) {

    try {

        const { status } = req.query;

        let query = supabase
            .from("bookings")
            .select("*")
            .order("created_at", { ascending: false });

        if (status) {
            query = query.eq("status", status);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export async function approveBooking(req, res) {

    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("bookings")
            .update({
                status: "Approved"
            })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json({
            success: true,
            message: "Booking approved successfully",
            booking: data[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export async function rejectBooking(req, res) {

    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("bookings")
            .update({
                status: "Cancelled"
            })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json({
            success: true,
            message: "Booking cancelled successfully",
            booking: data[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export async function startSession(req, res) {

    try {

        const { id } = req.params;
        const { payment_method } = req.body;

        // Get booking
        const { data: booking, error: bookingError } = await supabase
            .from("bookings")
            .select("*")
            .eq("id", id)
            .single();

        if (bookingError) throw bookingError;

        const startTime = new Date();

        const endTime = new Date(
            startTime.getTime() +
            booking.duration * 60000
        );

        const { data, error } = await supabase
            .from("bookings")
            .update({

                status: "Active",

                payment_method,

                start_time: startTime.toISOString(),

                end_time: endTime.toISOString()

            })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json({
            success: true,
            message: "Session started successfully",
            booking: data[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export async function completeSession(req, res) {

    try {

        const { id } = req.params;

        const { data, error } = await supabase
            .from("bookings")
            .update({
                status: "Completed"
            })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json({
            success: true,
            message: "Session completed successfully",
            booking: data[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}



export async function getHistory(req, res) {

    try {

        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .in("status", ["Active", "Completed"])
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export async function createWalkIn(req, res) {

    try {

        const {
            customer_name,
            system,
            players,
            duration,
            price,
            payment_method
        } = req.body;

        const { data: systemData, error: systemError } = await supabase
    .from("systems_new")
    .select("name")
    .eq("id", system)
    .single();

if (systemError || !systemData) {
    throw new Error("System not found");
}

        const startTime = new Date();

        const endTime = new Date(
            startTime.getTime() + Number(duration) * 60000
        );

        const { data, error } = await supabase
            .from("bookings")
            .insert([{

                customer_name,
                system: systemData.name,
                players,
                duration,
                price,
                payment_method,

                booking_type: "Walk-in",

                status: "Active",

                start_time: startTime.toISOString(),

                end_time: endTime.toISOString()

            }])
            .select();

        if (error) throw error;

        res.status(201).json({
            success: true,
            booking: data[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}