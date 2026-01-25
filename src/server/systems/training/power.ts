import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CoolDown, IsMeditating, Power, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { setComponent, setPairValue } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, statValue, multiplierValue] of world.query(
        Power,
        pair(TokenMultiplier, Power),
    )) {
        if (world.has(entity, pair(CoolDown, Power))) {
            continue;
        }

        if (!world.has(entity, IsMeditating)) {
            continue;
        }

        setComponent(world, entity, Power, statValue + multiplierValue);
        setPairValue(world, entity, CoolDown, Power, TRAINING_COOLDOWN, true);
    }
}

export const trainPowerSystem: SystemTable<[World]> = {
    system,
};
