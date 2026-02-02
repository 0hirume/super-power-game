import type { World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import Object from "@rbxts/object-utils";
import type { SystemTable } from "@rbxts/planck";

import { Status } from "../../../../shared/components";
import { STAT_STATUS_MAP } from "../../../../shared/constants/components";

function initializer(world: World): { system: () => void } {
    const entries = Object.entries(STAT_STATUS_MAP).map(([component, tag]) => ({
        query: world.query(tag).without(pair(Status.TrainingMode, component)).cached(),
        tag,
    }));

    function system(): void {
        for (const { query, tag } of entries) {
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
