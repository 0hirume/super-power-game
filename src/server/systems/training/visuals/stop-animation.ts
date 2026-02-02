import type { CachedQuery, Pair, Tag, TagDiscriminator, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Visual } from "../../../../shared/components";
import { STATUS_TAGS } from "../../../../shared/constants/components";

function initializers(world: World): { system: () => void } {
    const queries: Record<Tag, CachedQuery<[Pair<AnimationTrack, TagDiscriminator>]>> = {};

    for (const tag of STATUS_TAGS) {
        queries[tag] = world.query(pair(Visual.AnimationTrack, tag)).without(tag).cached();
    }

    function system(): void {
        for (const tag of STATUS_TAGS) {
            const query = queries[tag];

            if (query === undefined) {
                continue;
            }

            for (const [entity, track] of query) {
                world.remove(entity, pair(Visual.AnimationTrack, tag));

                track.Stop();
                track.Destroy();
            }
        }
    }

    return { system };
}

export const stopTrainingAnimation: SystemTable<[World]> = {
    name: "StopTrainingAnimation",
    system: initializers,
};
