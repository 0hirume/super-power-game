import { pair, type World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { PowerValue } from "../../../shared/components";
import { ActiveTrainingMode, TrainRequest } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

const INTERVAL = 1;

function system(world: World): void {
    for (const [entity] of world.query().with(pair(ActiveTrainingMode, PowerValue))) {
        addPair(world, entity, TrainRequest, PowerValue);
    }
}

export const addPowerTrainRequest: SystemTable<[World]> = {
    name: "AddPowerTrainRequest",
    runConditions: [timePassed(INTERVAL)],
    system,
};
