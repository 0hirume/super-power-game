import type { CachedQuery, Entity, Pair } from "@rbxts/jecs";
import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Action, Multiplier, Value } from "../../../../shared/components";
import { setComponent, setPairValue } from "../../../../shared/utilities/ecs";

const STATS = [Value.Strength, Value.Endurance, Value.Speed, Value.JumpForce, Value.Power] as const;

const COOLDOWN = 1;

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Entity<number>, Pair<number, number>]>> = {};

    for (const component of STATS) {
        queries[component] = world
            .query(component, pair(Multiplier.Token, component))
            .with(pair(Action.Train, component))
            .without(pair(Value.Cooldown, component))
            .cached();
    }

    function system(): void {
        for (const component of STATS) {
            const query = queries[component];

            if (query === undefined) {
                continue;
            }

            for (const [entity, value, multiplier] of query) {
                world.remove(entity, pair(Action.Train, component));

                setComponent(world, entity, component, value + multiplier);
                setPairValue(world, entity, Value.Cooldown, component, COOLDOWN);
            }
        }
    }

    return { system };
}

export const processTrainAction: SystemTable<[World]> = {
    name: "ProcessTrainAction",
    system: initializer,
};
