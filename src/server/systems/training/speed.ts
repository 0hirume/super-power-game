import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Speed, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { HumanoidMoveEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world.query(
        Speed,
        pair(TokenMultiplier, Speed),
    )) {
        if (!world.has(entity, HumanoidMoveEvent)) {
            continue;
        }

        if (world.has(entity, pair(Cooldown, Speed))) {
            continue;
        }

        world.remove(entity, HumanoidMoveEvent);

        setComponent(world, entity, Speed, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Speed, TRAINING_COOLDOWN, true);
    }
}

export const trainSpeedSystem: SystemTable<[World]> = {
    system,
};
