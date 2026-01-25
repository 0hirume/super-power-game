import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, JumpForce, PlayerInstance, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, playerInstance, statValue, multiplierValue] of world.query(
        PlayerInstance,
        JumpForce,
        pair(TokenMultiplier, JumpForce),
    )) {
        if (world.has(entity, pair(Cooldown, JumpForce))) {
            continue;
        }

        const humanoid = playerInstance.Character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        if (humanoid.GetState() !== Enum.HumanoidStateType.Jumping) {
            continue;
        }

        setComponent(world, entity, JumpForce, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, JumpForce, TRAINING_COOLDOWN, true);
    }
}

export const trainJumpSystem: SystemTable<[World]> = {
    system,
};
