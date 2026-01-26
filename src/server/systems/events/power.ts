import { pair, type World } from "@rbxts/jecs";
import { timePassed, type SystemTable } from "@rbxts/planck";

import { Power } from "../../../shared/components";
import { IsTraining, TrainEvent } from "../../../shared/tags";
import { addPair } from "../../../shared/utilities/ecs";

const INTERVAL = 1;

function system(world: World): void {
    for (const [entity] of world.query().with(pair(IsTraining, Power))) {
        addPair(world, entity, TrainEvent, Power);
    }
}

export const addPowerTrainEventSystem: SystemTable<[World]> = {
    runConditions: [timePassed(INTERVAL)],
    system,
};
