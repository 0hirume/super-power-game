import { pair, Wildcard, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { IsTraining, TrainEvent } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.train.query()) {
        for (const [entity, instance] of world
            .query(PlayerInstance)
            .with(pair(IsTraining, Wildcard))) {
            if (player !== instance) {
                continue;
            }

            const stat = world.target(entity, IsTraining);

            if (stat === undefined) {
                continue;
            }

            addPair(world, entity, TrainEvent, stat);

            break;
        }
    }
}

export const addTrainEventSystem: SystemTable<[World]> = {
    name: "AddTrainEvent",
    system,
};
