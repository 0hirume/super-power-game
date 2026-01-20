import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import {
    CoolDown,
    Endurance,
    EnduranceMultiplier,
    PlayerInstance,
    Power,
    PowerMultiplier,
    Strength,
    StrengthMultiplier,
} from "../../shared/components";
import { TRAINING_COOLDOWN } from "../../shared/constants/player";
import { routes } from "../../shared/routes";

const TRAINING_ACTIONS = [
    {
        multiplier: StrengthMultiplier,
        route: routes.trainStrength,
        stat: Strength,
    },
    {
        multiplier: EnduranceMultiplier,
        route: routes.trainEndurance,
        stat: Endurance,
    },
    {
        multiplier: PowerMultiplier,
        route: routes.trainPower,
        stat: Power,
    },
];

function system(world: World): void {
    for (const { multiplier, route, stat } of TRAINING_ACTIONS) {
        for (const [_, player] of route.query()) {
            for (const [entity, instance, statValue, multiplierValue] of world.query(
                PlayerInstance,
                stat,
                multiplier,
            )) {
                if (instance !== player) {
                    continue;
                }

                if (world.has(entity, pair(CoolDown, stat))) {
                    continue;
                }

                world.set(entity, stat, statValue + multiplierValue);
                world.set(entity, pair(CoolDown, stat), TRAINING_COOLDOWN);

                break;
            }
        }
    }
}

export const trainSystem: SystemTable<[World]> = {
    system,
};
