import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown, Power, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { IsMeditating } from "../../../shared/tags";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world
        .query(Power, pair(TokenMultiplier, Power))
        .with(IsMeditating)
        .without(pair(Cooldown, Power))) {
        setComponent(world, entity, Power, statValue + multiplierValue);
        setPairValue(world, entity, Cooldown, Power, TRAINING_COOLDOWN);
    }
}

export const trainPowerSystem: SystemTable<[World]> = {
    system,
};
