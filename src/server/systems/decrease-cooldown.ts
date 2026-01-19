import type { SystemTable } from "@rbxts/planck";
import { pair, Wildcard, type World } from "@rbxts/jecs";
import { CoolDown } from "../../shared/components";
import { scheduler } from "../../shared/scheduler";
import { COOLDOWN_ZERO } from "../../shared/constants/player";

function system(world: World): void {
    for (const [entity] of world.query(pair(CoolDown, Wildcard))) {
        let index = 0;
        let target = world.target(entity, CoolDown, index);

        while (target !== undefined) {
            const cooldownPair = pair(CoolDown, target);
            const cooldown = world.get(entity, cooldownPair);

            if (cooldown !== undefined) {
                const newCooldown = cooldown - scheduler.getDeltaTime();

                if (newCooldown <= COOLDOWN_ZERO) {
                    world.remove(entity, cooldownPair);
                } else {
                    world.set(entity, cooldownPair, newCooldown);
                }
            }

            index++;
            target = world.target(entity, CoolDown, index);
        }
    }
}

export const decreaseCoolDownSystem: SystemTable<[World]> = {
    system,
};
