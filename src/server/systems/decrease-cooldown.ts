import { pair, Wildcard, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Cooldown } from "../../shared/components";
import { COOLDOWN_ZERO } from "../../shared/constants/player";
import { setPairValue } from "../../shared/utilities/ecs";
import { scheduler } from "../scheduler";

function system(world: World): void {
    for (const [entity] of world.query(pair(Cooldown, Wildcard))) {
        let index = 0;
        let target = world.target(entity, Cooldown, index);

        while (target !== undefined) {
            const cooldown = world.get(entity, pair(Cooldown, target));

            if (cooldown !== undefined) {
                const newCooldown = cooldown - scheduler.getDeltaTime();

                if (newCooldown <= COOLDOWN_ZERO) {
                    world.remove(entity, pair(Cooldown, target));
                } else {
                    setPairValue(world, entity, Cooldown, target, newCooldown);
                }
            }

            index++;
            target = world.target(entity, Cooldown, index);
        }
    }
}

export const decreaseCoolDownSystem: SystemTable<[World]> = {
    system,
};
