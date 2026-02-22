import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { pair } from "@rbxts/jecs";
import Object from "@rbxts/object-utils";

import { Visual } from "../../../../shared/components";
import { STATUS_VISUAL_INSTANCES } from "../../../../shared/constants/components";

function initializer(world: World): { system: () => void } {
    const entries = Object.entries(STATUS_VISUAL_INSTANCES).map(([tag]) => ({
        query: world.query(pair(Visual.Instance, tag)).without(tag).cached(),
        tag,
    }));

    function system(): void {
        for (const { query, tag } of entries) {
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
