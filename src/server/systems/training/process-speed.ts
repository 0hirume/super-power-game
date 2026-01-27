import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, SpeedValue, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainRequest } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, speedValue, multiplierValue] of world
        .query(SpeedValue, pair(TokenMultiplier, SpeedValue))
        .with(pair(TrainRequest, SpeedValue))
        .without(pair(Cooldown, SpeedValue))) {
        world.remove(entity, pair(TrainRequest, SpeedValue));

        setComponent(world, entity, SpeedValue, speedValue + multiplierValue);
        setPairValue(world, entity, Cooldown, SpeedValue, TRAINING_COOLDOWN);
    }
}

export const processSpeedTraining: SystemTable<[World]> = {
    name: "ProcessSpeedTraining",
    system,
};
