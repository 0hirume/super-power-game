import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Speed, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world
        .query(Speed, pair(TokenMultiplier, Speed))
        .with(pair(TrainEvent, Speed))
        .without(pair(Cooldown, Speed))) {
        world.remove(entity, pair(TrainEvent, Speed));

        setComponent(world, entity, Speed, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Speed, TRAINING_COOLDOWN);
    }
}

export const trainSpeedSystem: SystemTable<[World]> = {
    name: "TrainSpeed",
    system,
};
