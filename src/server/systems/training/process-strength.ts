import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, StrengthValue, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainRequest } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, strengthValue, multiplierValue] of world
        .query(StrengthValue, pair(TokenMultiplier, StrengthValue))
        .with(pair(TrainRequest, StrengthValue))
        .without(pair(Cooldown, StrengthValue))) {
        world.remove(entity, pair(TrainRequest, StrengthValue));

        setComponent(world, entity, StrengthValue, strengthValue + multiplierValue);
        setPairValue(world, entity, Cooldown, StrengthValue, TRAINING_COOLDOWN);
    }
}

export const processStrengthTraining: SystemTable<[World]> = {
    name: "ProcessStrengthTraining",
    system,
};
