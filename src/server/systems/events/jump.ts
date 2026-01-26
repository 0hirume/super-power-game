import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { JumpForce, PlayerInstance } from "../../../shared/components";
import { routes } from "../../../shared/routes";
import { TrainEvent } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [_, player] of routes.humanoidJumped.query()) {
        for (const [entity, instance] of world.query(PlayerInstance)) {
            if (player !== instance) {
                continue;
            }

            addPair(world, entity, TrainEvent, JumpForce);

            break;
        }
    }
}

export const addJumpTrainEventSystem: SystemTable<[World]> = {
    system,
};
