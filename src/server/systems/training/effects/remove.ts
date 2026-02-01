import type { CachedQuery, Entity } from "@rbxts/jecs";
import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Status, Value } from "../../../../shared/components";

const STATUSES: Record<Entity<number>, Tag> = {
    [Value.Endurance]: Status.EnduranceTraining,
    [Value.Power]: Status.PowerTraining,
};

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Tag]>> = {};

    for (const [component, tag] of pairs(STATUSES)) {
        queries[component] = world
            .query(tag)
            .without(pair(Status.TrainingMode, component))
            .cached();
    }

    function system(): void {
        for (const [component, tag] of pairs(STATUSES)) {
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
