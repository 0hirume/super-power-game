import type { CachedQuery, Entity, Pair, TagDiscriminator } from "@rbxts/jecs";
import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Status, Value } from "../../../../shared/components";
import { addTag } from "../../../../shared/utilities/ecs";

const STATUSES: Record<Entity<number>, Tag> = {
    [Value.Strength]: Status.StrengthTraining,
    [Value.Endurance]: Status.EnduranceTraining,
    [Value.Power]: Status.PowerTraining,
};

function initializer(world: World): { system: () => void } {
    const queries: Record<Entity<number>, CachedQuery<[Pair<TagDiscriminator, number>]>> = {};

    for (const [component, tag] of pairs(STATUSES)) {
        queries[component] = world
            .query(pair(Status.TrainingMode, component))
            .without(tag)
            .cached();
    }

    function system(): void {
        for (const [component, tag] of pairs(STATUSES)) {
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
