import { makeTag } from "./utilities/ecs";
import { world } from "./world";

export const IsTraining = makeTag(world, "IsTraining", true);
export const IsMeditating = makeTag(world, "IsMeditating");

export const TrainRequest = makeTag(world, "TrainRequest");
