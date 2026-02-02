import type { CachedQuery, Entity } from "@rbxts/jecs";
import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Status } from "../../../../shared/components";
import { STAT_STATUS_MAP } from "../../../../shared/constants/components";

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Tag]>> = {};

    for (const [component, tag] of pairs(STAT_STATUS_MAP)) {
        queries[component] = world
            .query(tag)
            .without(pair(Status.TrainingMode, component))
            .cached();
    }

    function system(): void {
        for (const [component, tag] of pairs(STAT_STATUS_MAP)) {
            const query = queries[component];

            if (query === undefined) {
                continue;
            }

            for (const [entity] of query) {
                world.remove(entity, tag);
            }
        }
    }

    return { system };
}

export const removeTrainingModeEffects: SystemTable<[World]> = {
    name: "RemoveTrainingModeEffects",
    system: initializer,
};
