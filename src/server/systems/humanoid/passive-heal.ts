import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Endurance, Health } from "../../../shared/components";
import { BASE_MAX_HEALTH } from "../../../shared/constants/player";
import { setComponent } from "../../../shared/utilities/ecs";

const PASSIVE_HEAL_INTERVAL = 0.5;
const PASSIVE_HEAL_RATE = 0.005;

function system(world: World): void {
    for (const [entity, healthValue, enduranceValue] of world.query(Health, Endurance)) {
        const maxHealth = BASE_MAX_HEALTH + enduranceValue;

        setComponent(
            world,
            entity,
            Health,
            math.clamp(healthValue + maxHealth * PASSIVE_HEAL_RATE, healthValue, maxHealth),
        );
    }
}

export const passiveHealSystem: SystemTable<[World]> = {
    runConditions: [timePassed(PASSIVE_HEAL_INTERVAL)],
    system,
};
