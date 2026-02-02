import type { CachedQuery, Entity, Pair, TagDiscriminator } from "@rbxts/jecs";
import { pair, type World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Action, Status, Value } from "../../../../shared/components";
import { addPair } from "../../../../shared/utilities/ecs";

const STATS = [Value.Strength, Value.Endurance, Value.Power] as const;

const INTERVAL = 1;

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Pair<TagDiscriminator, number>]>> = {};

    for (const component of STATS) {
        queries[component] = world.query(pair(Status.TrainingMode, component));
    }

    function system(): void {
        for (const component of STATS) {
            const query = queries[component];

            if (query === undefined) {
                continue;
            }

            for (const [entity] of query) {
                addPair(world, entity, Action.Train, component);
            }
        }
    }

    return { system };
}

export const addTrainAction: SystemTable<[World]> = {
    name: "AddTrainAction",
    runConditions: [timePassed(INTERVAL)],
    system: initializer,
};
