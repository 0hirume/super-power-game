import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, JumpForceValue, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainRequest } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, jumpForceValue, multiplierValue] of world
        .query(JumpForceValue, pair(TokenMultiplier, JumpForceValue))
        .with(pair(TrainRequest, JumpForceValue))
        .without(pair(Cooldown, JumpForceValue))) {
        world.remove(entity, pair(TrainRequest, JumpForceValue));

        setComponent(world, entity, JumpForceValue, jumpForceValue + multiplierValue);
        setPairValue(world, entity, Cooldown, JumpForceValue, TRAINING_COOLDOWN);
    }
}

export const trainJumpSystem: SystemTable<[World]> = {
    name: "TrainJump",
    system,
};
