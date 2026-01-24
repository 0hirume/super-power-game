import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import {
    CoolDown,
    Endurance,
    PlayerInstance,
    Power,
    Strength,
    TokenMultiplier,
} from "../../shared/components";
import { TRAINING_COOLDOWN } from "../../shared/constants/player";
import { routes } from "../../shared/routes";
import { setComponent, setPairValue } from "../../shared/utilities/entity";

const TRAINING_ACTIONS = [
    {
        route: routes.trainStrength,
        stat: Strength,
    },
    {
        route: routes.trainEndurance,
        stat: Endurance,
    },
    {
        route: routes.trainPower,
        stat: Power,
    },
];

function system(world: World): void {
    for (const { route, stat } of TRAINING_ACTIONS) {
        for (const [_, player] of route.query()) {
            for (const [entity, instance, statValue, multiplierValue] of world.query(
                PlayerInstance,
                stat,
                pair(TokenMultiplier, stat),
            )) {
                if (instance !== player) {
                    continue;
                }

                if (world.has(entity, pair(CoolDown, stat))) {
                    continue;
                }

                setComponent(world, entity, stat, statValue + multiplierValue);
                setPairValue(world, entity, CoolDown, stat, TRAINING_COOLDOWN, true);

                break;
            }
        }
    }
}

export const trainSystem: SystemTable<[World]> = {
    system,
};
