import type { World } from "@rbxts/jecs";
import { pair, Wildcard } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { ContextActionService } from "@rbxts/services";

import { ActiveTrainingMode, FrozenMovementEffect } from "../../../shared/tags";

function system(world: World): void {
    for (const [entity] of world
        .query(FrozenMovementEffect)
        .without(pair(ActiveTrainingMode, Wildcard))) {
        ContextActionService.UnbindAction("FreezeMovement");
        world.remove(entity, FrozenMovementEffect);
    }
}

export const unfreezeMovementSystem: SystemTable<[World]> = {
    name: "UnfreezeMovementSystem",
    system,
};
