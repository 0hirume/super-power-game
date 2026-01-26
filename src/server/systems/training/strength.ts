import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Strength, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world
        .query(Strength, pair(TokenMultiplier, Strength))
        .with(pair(TrainEvent, Strength))
        .without(pair(Cooldown, Strength))) {
        world.remove(entity, pair(TrainEvent, Strength));

        setComponent(world, entity, Strength, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Strength, TRAINING_COOLDOWN);
    }
}

export const trainStrengthSystem: SystemTable<[World]> = {
    system,
};
