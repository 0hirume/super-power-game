import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, EnduranceValue, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainRequest } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, enduranceValue, multiplierValue] of world
        .query(EnduranceValue, pair(TokenMultiplier, EnduranceValue))
        .with(pair(TrainRequest, EnduranceValue))
        .without(pair(Cooldown, EnduranceValue))) {
        world.remove(entity, pair(TrainRequest, EnduranceValue));

        setComponent(world, entity, EnduranceValue, enduranceValue + multiplierValue);
        setPairValue(world, entity, Cooldown, EnduranceValue, TRAINING_COOLDOWN);
    }
}

export const processEnduranceTraining: SystemTable<[World]> = {
    name: "ProcessEnduranceTraining",
    system,
};
