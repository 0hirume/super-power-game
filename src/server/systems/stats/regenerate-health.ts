import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Value } from "../../../shared/components";
import { BASE } from "../../../shared/constants/player";
import { setComponent } from "../../../shared/utilities/ecs";

const REGENERATION_INTERVAL = 0.5;
const REGENERATION_RATE = 0.005;

function initializer(world: World): { system: () => void } {
    const query = world.query(Value.Health, Value.Endurance).cached();

    function system(): void {
        for (const [entity, healthValue, enduranceValue] of query) {
            const maxHealth = BASE.HEALTH + enduranceValue;

            setComponent(
                world,
                entity,
                Value.Health,
                math.clamp(healthValue + maxHealth * REGENERATION_RATE, healthValue, maxHealth),
            );
        }
    }

    return { system };
}

export const regenerateHealth: SystemTable<[World]> = {
    name: "RegenerateHealth",
    runConditions: [timePassed(REGENERATION_INTERVAL)],
    system: initializer,
};
