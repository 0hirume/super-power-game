import { makeTag } from "./utilities/ecs";
import { world } from "./world";

export const IsMeditating = makeTag(world, "IsMeditating", true);
