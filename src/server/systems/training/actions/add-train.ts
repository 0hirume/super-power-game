import type { CachedQuery, Entity, Pair, TagDiscriminator } from "@rbxts/jecs";
import { pair, type World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Action, Status } from "../../../../shared/components";
import { STAT_COMPONENTS } from "../../../../shared/constants/components";
import { addPair } from "../../../../shared/utilities/ecs";

const INTERVAL = 1;

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Pair<TagDiscriminator, number>]>> = {};

    for (const component of STAT_COMPONENTS) {
        queries[component] = world.query(pair(Status.TrainingMode, component));
    }

    function system(): void {
        for (const component of STAT_COMPONENTS) {
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
