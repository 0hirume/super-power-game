import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Endurance, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { TrainEnduranceEvent } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world.query(
        Endurance,
        pair(TokenMultiplier, Endurance),
    )) {
        if (!world.has(entity, TrainEnduranceEvent)) {
            continue;
        }

        if (world.has(entity, pair(Cooldown, Endurance))) {
            continue;
        }

        world.remove(entity, TrainEnduranceEvent);

        setComponent(world, entity, Endurance, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Endurance, TRAINING_COOLDOWN);
    }
}

export const trainEnduranceSystem: SystemTable<[World]> = {
    system,
};
