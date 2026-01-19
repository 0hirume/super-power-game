import { pair, type World } from "@rbxts/jecs";
import { routes } from "../../shared/routes";
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

const TRAINING_ACTIONS = [
    {
        multiplierComponent: StrengthMultiplier,
        route: routes.trainStrength,
        statComponent: Strength,
    },
    {
        multiplierComponent: EnduranceMultiplier,
        route: routes.trainEndurance,
        statComponent: Endurance,
    },
    {
        multiplierComponent: PowerMultiplier,
        route: routes.trainPower,
        statComponent: Power,
    },
];

function system(world: World): void {
    for (const training of TRAINING_ACTIONS) {
        for (const [_, player] of training.route.query()) {
            for (const [entity, instance, stat, multiplier] of world.query(
                PlayerInstance,
                training.statComponent,
                training.multiplierComponent,
            )) {
                if (instance === player && !world.has(entity, pair(CoolDown, training.statComponent))) {
                    world.set(entity, training.statComponent, stat + multiplier);
                    world.set(entity, pair(CoolDown, training.statComponent), TRAINING_COOLDOWN);
                    break;
                }
            }
        }
    }
}

export const trainSystem: SystemTable<[World]> = {
    system,
};
