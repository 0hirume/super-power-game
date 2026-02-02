import { pair, type World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Action, Status, Value } from "../../../../shared/components";
import { addPair } from "../../../../shared/utilities/ecs";

const INTERVAL = 1;

function initializer(world: World): { system: () => void } {
    const query = world.query(pair(Status.TrainingMode, Value.Power));

    function system(): void {
        for (const [entity] of query) {
            addPair(world, entity, Action.Train, Value.Power);
        }
    }

    return { system };
}

export const addPowerTrainRequest: SystemTable<[World]> = {
    name: "AddPowerTrainRequest",
    runConditions: [timePassed(INTERVAL)],
    system: initializer,
};
