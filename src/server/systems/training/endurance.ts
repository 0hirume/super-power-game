import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CoolDown, PlayerInstance, Endurance, TokenMultiplier } from "../../../shared/components";
import { TRAINING_COOLDOWN } from "../../../shared/constants/player";
import { routes } from "../../../shared/routes";
import { setComponent, setPairValue } from "../../../shared/utilities/entity";

function system(world: World): void {
    for (const [_, player] of routes.trainEndurance.query()) {
        for (const [entity, instance, statValue, multiplierValue] of world.query(
            PlayerInstance,
            Endurance,
            pair(TokenMultiplier, Endurance),
        )) {
            if (instance !== player) {
                continue;
            }

            if (world.has(entity, pair(CoolDown, Endurance))) {
                continue;
            }

            setComponent(world, entity, Endurance, statValue + multiplierValue);
            setPairValue(world, entity, CoolDown, Endurance, TRAINING_COOLDOWN, true);

            break;
        }
    }
}

export const trainEnduranceSystem: SystemTable<[World]> = {
    system,
};
