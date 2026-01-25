import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Health, MaxHealth, PlayerInstance } from "../../../shared/components";

function system(world: World): void {
    for (const [_, instance, healthValue, maxHealthValue] of world.query(
        PlayerInstance,
        Health,
        MaxHealth,
    )) {
        const humanoid = instance.Character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        humanoid.Health = healthValue;
        humanoid.MaxHealth = maxHealthValue;
    }
}

export const syncHealthSystem: SystemTable<[World]> = {
    system,
};
