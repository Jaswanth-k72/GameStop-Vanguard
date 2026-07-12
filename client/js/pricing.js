// -----------------------------------
// Calculate Estimated Price
// -----------------------------------

export function calculateEstimatedPrice(
    pricing,
    system,
    players,
    duration
) {

    if (!system || !players || !duration)
        return 0;

    players = Number(players);
    duration = Number(duration);

    // PS5 & PS4
    if (
        system === "PlayStation 5" ||
        system === "PlayStation 4"
    ) {

        const row = pricing.find(p =>
            p.system === system &&
            p.players === players &&
            p.duration === 60
        );

        if (!row) return 0;

        let total =
            (row.price / 60) * duration;

        // 30-minute rule
        if (duration === 30)
            total += 20;

        return Math.round(total);
    }

    // Racing & VR

    const row = pricing.find(p =>
        p.system === system &&
        p.duration === duration
    );

    return row ? row.price : 0;

}