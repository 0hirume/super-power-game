import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, JumpForce, PlayerInstance, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { routes } from "../../../shared/routes";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.humanoidJumped.query()) {
        for (const [entity, playerInstance, statValue, multiplierValue] of world.query(
            PlayerInstance,
            JumpForce,
            pair(TokenMultiplier, JumpForce),
        )) {
            if (playerInstance !== player) {
                continue;
            }

            if (world.has(entity, pair(Cooldown, JumpForce))) {
                continue;
            }

            setComponent(world, entity, JumpForce, statValue + multiplierValue);
            setPairValue(world, entity, Cooldown, JumpForce, TRAINING_COOLDOWN, true);

            break;
        }
    }
}

export const trainJumpSystem: SystemTable<[World]> = {
    system,
};
