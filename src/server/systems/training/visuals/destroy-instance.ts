import type { CachedQuery, Pair, Tag, TagDiscriminator, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Status, Visual } from "../../../../shared/components";

const STATUSES = [Status.EnduranceTraining, Status.PowerTraining] as const;

function initializer(world: World): { system: () => void } {
    const queries: Record<Tag, CachedQuery<[Pair<Model, TagDiscriminator>]>> = {};

    for (const tag of STATUSES) {
        queries[tag] = world.query(pair(Visual.Instance, tag)).without(tag).cached();
    }

    function system(): void {
        for (const tag of STATUSES) {
            const query = queries[tag];

            if (query === undefined) {
                continue;
            }

            for (const [entity, model] of query) {
                world.remove(entity, pair(Visual.Instance, tag));
                model.Destroy();
            }
        }
    }

    return { system };
}

export const destroyTrainingVisualEffect: SystemTable<[World]> = {
    name: "DestroyTrainingVisualEffect",
    system: initializer,
};
