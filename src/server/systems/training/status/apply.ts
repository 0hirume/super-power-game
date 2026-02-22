import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { pair } from "@rbxts/jecs";
import Object from "@rbxts/object-utils";

import { Status } from "../../../../shared/components";
import { STAT_STATUS_MAP } from "../../../../shared/constants/components";
import { addTag } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const entries = Object.entries(STAT_STATUS_MAP).map(([component, tag]) => ({
        query: world.query(pair(Status.TrainingMode, component)).without(tag).cached(),
        tag,
    }));

    function system(): void {
        for (const { query, tag } of entries) {
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
