import { pair, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { ActiveTrainingMode } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player, trainingMode] of routes.requestSetTrainingMode.query()) {
        for (const [entity, instance] of world.query(PlayerInstance)) {
            if (player !== instance) {
                continue;
            }

            const currentTrainingMode = world.target(entity, ActiveTrainingMode);

            if (currentTrainingMode !== undefined) {
                world.remove(entity, pair(ActiveTrainingMode, currentTrainingMode));
            }

            if (currentTrainingMode !== trainingMode) {
                addPair(world, entity, ActiveTrainingMode, trainingMode, true);
            }

            break;
        }
    }
}

export const handleSetTrainingMode: SystemTable<[World]> = {
    name: "HandleSetTrainingMode",
    system,
};
