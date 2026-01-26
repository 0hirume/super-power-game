import { makeTag } from "./utilities/ecs";
import { world } from "./world";

export const IsTraining = makeTag(world, "IsTraining", true);

export const TrainEvent = makeTag(world, "TrainEvent");
