import supabase from "../config/supabase.js";

export async function getPricing(req, res) {

    try {

        const { data, error } = await supabase
            .from("pricing_new")
            .select("*");

        if (error) throw error;

        res.json({
            success: true,
            data
        });

    } catch (err) {

        console.error("Pricing Error:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}