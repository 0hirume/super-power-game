import type { World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Action, Player, Value } from "../../../../shared/components";
import { addPair } from "../../../../shared/utilities/ecs";

const THRESHOLD = 0.5;
const INTERVAL = 1;

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Humanoid);

    function system(): void {
        for (const [entity, humanoid] of query) {
            if (humanoid.MoveDirection.Magnitude <= THRESHOLD) {
                continue;
            }

            addPair(world, entity, Action.Train, Value.Speed);
        }
    }

    return { system };
}

export const addSpeedTrainRequest: SystemTable<[World]> = {
    name: "AddSpeedTrainRequest",
    runConditions: [timePassed(INTERVAL)],
    system: initializer,
};
