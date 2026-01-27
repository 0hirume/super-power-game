import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { EnduranceValue, HealthValue } from "../../../shared/components";
import { BASE_MAX_HEALTH } from "../../../shared/constants/player";
import { setComponent } from "../../../shared/utilities/ecs";

const REGENERATION_INTERVAL = 0.5;
const REGENERATION_RATE = 0.005;

function system(world: World): void {
    for (const [entity, healthValue, enduranceValue] of world.query(HealthValue, EnduranceValue)) {
        const maxHealth = BASE_MAX_HEALTH + enduranceValue;

        setComponent(
            world,
            entity,
            HealthValue,
            math.clamp(healthValue + maxHealth * REGENERATION_RATE, healthValue, maxHealth),
        );
    }
}

export const regenerateHealth: SystemTable<[World]> = {
    name: "RegenerateHealth",
    runConditions: [timePassed(REGENERATION_INTERVAL)],
    system,
};
