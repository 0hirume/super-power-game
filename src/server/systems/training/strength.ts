import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, PlayerInstance, Strength, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { routes } from "../../../shared/routes";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.trainStrength.query()) {
        for (const [entity, instance, statValue, multiplierValue] of world.query(
            PlayerInstance,
            Strength,
            pair(TokenMultiplier, Strength),
        )) {
            if (instance !== player) {
                continue;
            }

            if (world.has(entity, pair(Cooldown, Strength))) {
                continue;
            }

            setComponent(world, entity, Strength, statValue + multiplierValue);
            setPairValue(world, entity, Cooldown, Strength, TRAINING_COOLDOWN, true);

            break;
        }
    }
}

export const trainStrengthSystem: SystemTable<[World]> = {
    system,
};
