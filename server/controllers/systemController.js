import supabase from "../config/supabase.js";

export async function getSystems(req, res) {

    const { data, error } = await supabase
        .from("systems")
        .select("*")
        .order("name");

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