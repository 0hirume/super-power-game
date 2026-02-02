import type { World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Visual } from "../../../../shared/components";
import { STATUS_TAGS } from "../../../../shared/constants/components";

function initializers(world: World): { system: () => void } {
    const entries = STATUS_TAGS.map((tag) => ({
        query: world.query(pair(Visual.AnimationTrack, tag)).without(tag).cached(),
        tag,
    }));

    function system(): void {
        for (const { query, tag } of entries) {
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
