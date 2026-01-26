import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { IsTraining } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player, trainingMode] of routes.setTrainingMode.query()) {
        for (const [entity, instance] of world.query(PlayerInstance)) {
            if (player !== instance) {
                continue;
            }

            const currentTrainingMode = world.target(entity, IsTraining);

            if (currentTrainingMode !== undefined) {
                world.remove(entity, pair(IsTraining, currentTrainingMode));
            }

            if (currentTrainingMode !== trainingMode) {
                addPair(world, entity, IsTraining, trainingMode, true);
            }

            break;
        }
    }
}

export const setTrainingModeSystem: SystemTable<[World]> = {
    system,
};
