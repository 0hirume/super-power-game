import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { PlayerInstance } from "../../../shared/components";
import { HumanoidMoveEvent } from "../../../shared/tags";
import { addTag } from "../../../shared/utilities/ecs";

const THRESHOLD = 0.5;
const INTERVAL = 1;

function system(world: World): void {
    for (const [entity, instance] of world.query(PlayerInstance)) {
        const humanoid = instance.Character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        if (humanoid.MoveDirection.Magnitude <= THRESHOLD) {
            continue;
        }

        addTag(world, entity, HumanoidMoveEvent);
    }
}

export const addHumanoidMoveEventSystem: SystemTable<[World]> = {
    runConditions: [timePassed(INTERVAL)],
    system,
};
