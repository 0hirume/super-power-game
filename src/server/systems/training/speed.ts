import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, PlayerInstance, Speed, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, playerInstance, statValue, multiplierValue] of world.query(
        PlayerInstance,
        Speed,
        pair(TokenMultiplier, Speed),
    )) {
        if (world.has(entity, pair(Cooldown, Speed))) {
            continue;
        }

        const character = playerInstance.Character;
        const humanoid = character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        if (humanoid.MoveDirection === Vector3.zero) {
            continue;
        }

        setComponent(world, entity, Speed, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Speed, TRAINING_COOLDOWN, true);
    }
}

export const trainSpeedSystem: SystemTable<[World]> = {
    system,
};
