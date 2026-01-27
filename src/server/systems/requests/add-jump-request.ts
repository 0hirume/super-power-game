import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { JumpForceValue, PlayerInstance } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { TrainRequest } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.onHumanoidJumped.query()) {
        for (const [entity, instance] of world.query(PlayerInstance)) {
            if (player !== instance) {
                continue;
            }

            addPair(world, entity, TrainRequest, JumpForceValue);

            break;
        }
    }
}

export const addJumpTrainRequest: SystemTable<[World]> = {
    name: "AddJumpTrainRequest",
    system,
};
