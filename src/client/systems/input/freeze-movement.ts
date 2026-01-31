import type { World } from "@rbxts/jecs";
import { pair, Wildcard } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { ContextActionService } from "@rbxts/services";

import { ActiveTrainingMode, FrozenMovementEffect } from "../../../shared/tags";
import { addTag } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity] of world
        .query(pair(ActiveTrainingMode, Wildcard))
        .without(FrozenMovementEffect)) {
        ContextActionService.BindAction(
            "FreezeMovement",
            () => Enum.ContextActionResult.Sink,
            false,
            ...Enum.PlayerActions.GetEnumItems(),
        );

        addTag(world, entity, FrozenMovementEffect);
    }
}

export const freezeMovementSystem: SystemTable<[World]> = {
    name: "FreezeMovementSystem",
    system,
};
