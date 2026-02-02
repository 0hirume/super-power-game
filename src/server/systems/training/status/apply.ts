import type { CachedQuery, Entity, Pair, TagDiscriminator } from "@rbxts/jecs";
import type { World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Status } from "../../../../shared/components";
import { STAT_STATUS_MAP } from "../../../../shared/constants/components";
import { addTag } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Pair<TagDiscriminator, number>]>> = {};

    for (const [component, tag] of pairs(STAT_STATUS_MAP)) {
        queries[component] = world
            .query(pair(Status.TrainingMode, component))
            .without(tag)
            .cached();
    }

    function system(): void {
        for (const [component, tag] of pairs(STAT_STATUS_MAP)) {
            const query = queries[component];

            if (query === undefined) {
                continue;
            }

            for (const [entity] of query) {
                addTag(world, entity, tag);
            }
        }
    }

    return { system };
}

export const applyTrainingModeEffects: SystemTable<[World]> = {
    name: "ApplyTrainingModeEffects",
    system: initializer,
};
