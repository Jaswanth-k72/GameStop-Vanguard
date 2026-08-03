import supabase from "../config/supabase.js";

export async function calculatePrice(systemId, players, duration) {

    // Get system information
    const { data: system, error: systemError } = await supabase
        .from("systems_new")
        .select("*")
        .eq("id", systemId)
        .single();

    if (systemError || !system) {
        throw new Error("System not found");
    }

    let lookupDuration = Number(duration);

    // Hourly systems always use 60-minute base price
    if (system.pricing_type === "hourly") {
        lookupDuration = 60;
    }

    const { data: priceRow, error: priceError } = await supabase
        .from("pricing_new")
        .select("*")
        .eq("system_id", system.id)
        .eq("players", Number(players))
        .eq("duration", lookupDuration)
        .single();

    if (priceError || !priceRow) {
        throw new Error("Pricing not found");
    }

    // Hourly calculation
    if (system.pricing_type === "hourly") {

        const hourlyPrice = Number(priceRow.price);

        if (Number(duration) === 30) {
            return Math.round(hourlyPrice / 2) + 10;
        }

        return hourlyPrice * (Number(duration) / 60);

    }

    // Fixed-price systems
    return Number(priceRow.price);

}
