import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { HumanoidInstance, SpeedValue } from "../../../shared/components";
import { TrainRequest } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

const THRESHOLD = 0.5;
const INTERVAL = 1;

function system(world: World): void {
    for (const [entity, instance] of world.query(HumanoidInstance)) {
        if (instance.MoveDirection.Magnitude <= THRESHOLD) {
            continue;
        }

        addPair(world, entity, TrainRequest, SpeedValue);
    }
}

export const addSpeedTrainEventSystem: SystemTable<[World]> = {
    name: "AddSpeedTrainEvent",
    runConditions: [timePassed(INTERVAL)],
    system,
};
