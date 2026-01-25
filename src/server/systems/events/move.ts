import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../shared/components";
import { HumanoidMoveEvent } from "../../../shared/tags";
import { addTag } from "../../../shared/utilities/ecs";

const ZERO = 0;

function system(world: World): void {
    for (const [entity, instance] of world.query(PlayerInstance)) {
        const humanoid = instance.Character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined || humanoid.MoveDirection.Magnitude === ZERO) {
            continue;
        }

        addTag(world, entity, HumanoidMoveEvent);
    }
}

export const addHumanoidMoveEventSystem: SystemTable<[World]> = {
    system,
};
