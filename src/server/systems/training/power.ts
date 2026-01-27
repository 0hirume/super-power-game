import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, PowerValue, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainRequest } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, powerValue, multiplierValue] of world
        .query(PowerValue, pair(TokenMultiplier, PowerValue))
        .with(pair(TrainRequest, PowerValue))
        .without(pair(Cooldown, PowerValue))) {
        world.remove(entity, pair(TrainRequest, PowerValue));

        setComponent(world, entity, PowerValue, powerValue + multiplierValue);
        setPairValue(world, entity, Cooldown, PowerValue, TRAINING_COOLDOWN);
    }
}

export const processPowerTraining: SystemTable<[World]> = {
    name: "ProcessPowerTraining",
    system,
};
