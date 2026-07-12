import supabase from "../config/supabase.js";

export async function calculatePrice(system, players, duration) {

    let lookupDuration = duration;

    // PS5 & PS4 pricing is stored as hourly rate
    if (
        system === "PlayStation 5" ||
        system === "PlayStation 4"
    ) {
        lookupDuration = 60;
    }

    const { data, error } = await supabase
        .from("pricing")
        .select("price")
        .eq("system", system)
        .eq("players", players)
        .eq("duration", lookupDuration)
        .single();

    if (error || !data) {
        throw new Error("Pricing not found");
    }

    // PS5 & PS4 calculation
    if (
        system === "PlayStation 5" ||
        system === "PlayStation 4"
    ) {

        let total = (data.price / 60) * duration;

        // Your gaming centre rule
        if (duration === 30) {
            total += 20;
        }

        return Math.round(total);
    }

    return data.price;
}