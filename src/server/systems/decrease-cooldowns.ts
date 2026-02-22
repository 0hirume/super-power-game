import type { SystemTable } from "@rbxts/planck";

import { pair, Wildcard, type World } from "@rbxts/jecs";

import { Value } from "../../shared/components";
import { setPairValue } from "../../shared/utilities/ecs";
import { scheduler } from "../scheduler";

const ZERO = 0;

function initializer(world: World): { system: () => void } {
    const query = world.query(pair(Value.Cooldown, Wildcard)).cached();

    function system(): void {
        for (const [entity] of query) {
            let index = 0;
            let target = world.target(entity, Value.Cooldown, index);

            while (target !== undefined) {
                const cooldown = world.get(entity, pair(Value.Cooldown, target));

                if (cooldown !== undefined) {
                    const newCooldown = cooldown - scheduler.getDeltaTime();

                    if (newCooldown <= ZERO) {
                        world.remove(entity, pair(Value.Cooldown, target));
                    } else {
                        setPairValue(world, entity, Value.Cooldown, target, newCooldown);
                    }
                }

                index++;
                target = world.target(entity, Value.Cooldown, index);
            }
        }
    }
    return { system };
}

export const decreaseCooldowns: SystemTable<[World]> = {
    name: "DecreaseCooldowns",
    system: initializer,
};
