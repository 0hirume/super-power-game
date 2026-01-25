import { makeTag } from "./utilities/ecs";
import { world } from "./world";

export const IsMeditating = makeTag(world, "IsMeditating", true);

export const TrainStrengthEvent = makeTag(world, "TrainStrengthEvent");
export const TrainEnduranceEvent = makeTag(world, "TrainEnduranceEvent");

export const HumanoidMoveEvent = makeTag(world, "HumanoidMoveEvent");
export const HumanoidJumpEvent = makeTag(world, "HumanoidJumpEvent");
