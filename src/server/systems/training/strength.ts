import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Strength, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainStrengthEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world.query(
        Strength,
        pair(TokenMultiplier, Strength),
    )) {
        if (!world.has(entity, TrainStrengthEvent)) {
            continue;
        }

        if (world.has(entity, pair(Cooldown, Strength))) {
            continue;
        }

        world.remove(entity, TrainStrengthEvent);

        setComponent(world, entity, Strength, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Strength, TRAINING_COOLDOWN);
    }
}

export const trainStrengthSystem: SystemTable<[World]> = {
    system,
};
