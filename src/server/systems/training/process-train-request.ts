import type { Entity } from "@rbxts/jecs";
import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import {
    Cooldown,
    EnduranceValue,
    JumpForceValue,
    PowerValue,
    SpeedValue,
    StrengthValue,
    TokenMultiplier,
} from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainRequest } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

const STAT_COMPONENTS: Entity<number>[] = [
    StrengthValue,
    EnduranceValue,
    SpeedValue,
    JumpForceValue,
    PowerValue,
];

function system(world: World): void {
    for (const component of STAT_COMPONENTS) {
        for (const [entity, statValue, multiplierValue] of world
            .query(component, pair(TokenMultiplier, component))
            .with(pair(TrainRequest, component))
            .without(pair(Cooldown, component))) {
            world.remove(entity, pair(TrainRequest, component));

            setComponent(world, entity, component, statValue + multiplierValue);
            setPairValue(world, entity, Cooldown, component, TRAINING_COOLDOWN);
        }
    }
}

export const processTrainRequest: SystemTable<[World]> = {
    name: "ProcessTrainRequest",
    system,
};
