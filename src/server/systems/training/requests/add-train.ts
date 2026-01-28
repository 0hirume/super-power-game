import { pair, Wildcard, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../../shared/components";
import { routes } from "../../../../shared/routes";
import { ActiveTrainingMode, TrainRequest } from "../../../../shared/tags";
import { addPair } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.requestTrain.query()) {
        for (const [entity, instance] of world
            .query(PlayerInstance)
            .with(pair(ActiveTrainingMode, Wildcard))) {
            if (player !== instance) {
                continue;
            }

            const stat = world.target(entity, ActiveTrainingMode);

            if (stat === undefined) {
                continue;
            }

            addPair(world, entity, TrainRequest, stat);

            break;
        }
    }
}

export const addTrainRequest: SystemTable<[World]> = {
    name: "AddTrainRequest",
    system,
};
