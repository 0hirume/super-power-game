import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { pair, Wildcard } from "@rbxts/jecs";
import { ContextActionService } from "@rbxts/services";

import { Status } from "../../../shared/components";
import { addTag } from "../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world
        .query(pair(Status.TrainingMode, Wildcard))
        .without(Status.MovementFrozen)
        .cached();

    function system(): void {
        for (const [entity] of query) {
            ContextActionService.BindAction(
                "FreezeMovement",
                () => Enum.ContextActionResult.Sink,
                false,
                ...Enum.PlayerActions.GetEnumItems(),
            );

            addTag(world, entity, Status.MovementFrozen);
        }
    }

    return { system };
}

export const freezeMovementSystem: SystemTable<[World]> = {
    name: "FreezeMovementSystem",
    system: initializer,
};
