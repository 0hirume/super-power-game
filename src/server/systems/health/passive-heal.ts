import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Health, MaxHealth } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

const PASSIVE_HEAL_INTERVAL = 0.5;
const PASSIVE_HEAL_RATE = 0.005;

function system(world: World): void {
    for (const [entity, healthValue, maxHealthValue] of world.query(Health, MaxHealth)) {
        setComponent(
            world,
            entity,
            Health,
            math.clamp(
                healthValue + maxHealthValue * PASSIVE_HEAL_RATE,
                healthValue,
                maxHealthValue,
            ),
        );
    }
}

export const passiveHealSystem: SystemTable<[World]> = {
    runConditions: [timePassed(PASSIVE_HEAL_INTERVAL)],
    system,
};
