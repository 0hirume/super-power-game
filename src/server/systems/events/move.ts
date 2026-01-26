import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { PlayerInstance, Speed } from "../../../shared/components";
import { TrainEvent } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

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

        addPair(world, entity, TrainEvent, Speed);
    }
}

export const addSpeedTrainEventSystem: SystemTable<[World]> = {
    runConditions: [timePassed(INTERVAL)],
    system,
};
