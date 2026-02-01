import { pair, Wildcard, type World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Action, Player, Status } from "../../../../shared/components";
import { routes } from "../../../../shared/routes";
import { addPair } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance).with(pair(Status.TrainingMode, Wildcard)).cached();

    function system(): void {
        for (const [_, player] of routes.requestTrain.query()) {
            for (const [entity, instance] of query) {
                if (player !== instance) {
                    continue;
                }

                const stat = world.target(entity, Status.TrainingMode);

                if (stat === undefined) {
                    continue;
                }

                addPair(world, entity, Action.Train, stat);

                break;
            }
        }
    }

    return { system };
}

export const addTrainRequest: SystemTable<[World]> = {
    name: "AddTrainRequest",
    system: initializer,
};
