import { makeTag } from "./utilities/ecs";
import { world } from "./world";

export const ActiveTrainingMode = makeTag(world, "ActiveTrainingMode", true);
export const TrainRequest = makeTag(world, "TrainRequest");

export const StrengthTrainingEffect = makeTag(world, "StrengthTrainingEffect");
export const EnduranceTrainingEffect = makeTag(world, "EnduranceTrainingEffect");
export const PowerTrainingEffect = makeTag(world, "PowerTrainingEffect");
