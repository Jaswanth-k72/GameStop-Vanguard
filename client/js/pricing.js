// -----------------------------------
// Calculate Estimated Price
// -----------------------------------

export function calculateEstimatedPrice(
    systems,
    pricing,
    systemId,
    players,
    duration
) {

    if (!systemId || !players || !duration)
        return 0;

    players = Number(players);
    duration = Number(duration);

    const system = systems.find(
        s => s.id === systemId
    );

    if (!system) return 0;

    // Hourly pricing (PS4 & PS5)

    if (system.pricing_type === "hourly") {

        const hourly = pricing.find(p =>

            p.system_id === system.id &&
            Number(p.players) === players &&
            Number(p.duration) === 60

        );

        if (!hourly) return 0;

        const hourlyPrice = Number(hourly.price);

        if (duration === 30) {
            return Math.round(hourlyPrice / 2) + 10;
        }

        return hourlyPrice * (duration / 60);

    }

    // Fixed pricing (VR & Racing)

    const fixed = pricing.find(p =>

        p.system_id === system.id &&
        Number(p.players) === players &&
        Number(p.duration) === duration

    );

    return fixed ? fixed.price : 0;

}