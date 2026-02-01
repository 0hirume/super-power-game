import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Action, Player, Value } from "../../../../shared/components";
import { routes } from "../../../../shared/routes";
import { addPair } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance);

    function system(): void {
        for (const [_, requester] of routes.onHumanoidJumped.query()) {
            for (const [entity, player] of query) {
                if (requester !== player) {
                    continue;
                }

                addPair(world, entity, Action.Train, Value.JumpForce);

                break;
            }
        }
    }

    return { system };
}

export const addJumpTrainRequest: SystemTable<[World]> = {
    name: "AddJumpTrainRequest",
    system: initializer,
};
