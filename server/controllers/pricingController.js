import supabase from "../config/supabase.js";

export async function getPricing(req, res) {

    const { data, error } = await supabase
        .from("pricing")
        .select("*");

    if (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

    res.json({
        success: true,
        data
    });

}