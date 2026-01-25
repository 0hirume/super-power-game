import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { TrainEnduranceEvent } from "../../../shared/tags";
import { addTag } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.trainEndurance.query()) {
        for (const [entity, instance] of world.query(PlayerInstance)) {
            if (player !== instance) {
                continue;
            }

            addTag(world, entity, TrainEnduranceEvent);

            break;
        }
    }
}

export const addTrainEnduranceEventSystem: SystemTable<[World]> = {
    system,
};
