import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Endurance, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world
        .query(Endurance, pair(TokenMultiplier, Endurance))
        .with(pair(TrainEvent, Endurance))
        .without(pair(Cooldown, Endurance))) {
        world.remove(entity, pair(TrainEvent, Endurance));

        setComponent(world, entity, Endurance, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Endurance, TRAINING_COOLDOWN);
    }
}

export const trainEnduranceSystem: SystemTable<[World]> = {
    system,
};
