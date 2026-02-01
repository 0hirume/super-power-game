import type { World } from "@rbxts/jecs";
import { pair, Wildcard } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { ContextActionService } from "@rbxts/services";

import { Status } from "../../../shared/components";

function initializer(world: World): { system: () => void } {
    const query = world
        .query(Status.MovementFrozen)
        .without(pair(Status.TrainingMode, Wildcard))
        .cached();

    function system(): void {
        for (const [entity] of query) {
            world.remove(entity, Status.MovementFrozen);
            ContextActionService.UnbindAction("FreezeMovement");
        }
    }

    return { system };
}

export const unfreezeMovementSystem: SystemTable<[World]> = {
    name: "UnfreezeMovementSystem",
    system: initializer,
};
