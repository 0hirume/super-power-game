import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, JumpForce, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { HumanoidJumpEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world.query(
        JumpForce,
        pair(TokenMultiplier, JumpForce),
    )) {
        if (!world.has(entity, HumanoidJumpEvent)) {
            continue;
        }

        if (world.has(entity, pair(Cooldown, JumpForce))) {
            continue;
        }

        world.remove(entity, HumanoidJumpEvent);

        setComponent(world, entity, JumpForce, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, JumpForce, TRAINING_COOLDOWN);
    }
}

export const trainJumpSystem: SystemTable<[World]> = {
    system,
};
