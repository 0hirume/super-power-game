import { makeTag } from "./utilities/ecs";
import { world } from "./world";

export const ActiveTrainingMode = makeTag(world, "ActiveTrainingMode", true);
export const TrainRequest = makeTag(world, "TrainRequest");
