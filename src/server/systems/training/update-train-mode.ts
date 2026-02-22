import type { SystemTable } from "@rbxts/planck";

import { pair, type World } from "@rbxts/jecs";

import { Player, Status } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { addPair } from "../../../shared/utilities/ecs";

function inititializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance).cached();

    function system(): void {
        for (const [_, requester, mode] of routes.requestTrainingModeChange.query()) {
            for (const [entity, player] of query) {
                if (requester !== player) {
                    continue;
                }

                const currentMode = world.target(entity, Status.TrainingMode);

                if (currentMode !== undefined) {
                    world.remove(entity, pair(Status.TrainingMode, currentMode));
                }

                if (currentMode !== mode) {
                    addPair(world, entity, Status.TrainingMode, mode, true);
                }

                break;
            }
        }
    }

    return { system };
}

export const updateTrainingMode: SystemTable<[World]> = {
    name: "UpdateTrainingMode",
    system: inititializer,
};
