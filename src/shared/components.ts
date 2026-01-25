import { makeComponent, makeTag } from "./utilities/ecs";
import { world } from "./world";

export const PlayerInstance = makeComponent<Player>(world, "PlayerInstance", true);

export const Health = makeComponent<number>(world, "Health", true);
export const MaxHealth = makeComponent<number>(world, "MaxHealth", true);

export const Strength = makeComponent<number>(world, "Strength", true);
export const Endurance = makeComponent<number>(world, "Endurance", true);
export const Speed = makeComponent<number>(world, "Speed", true);
export const JumpForce = makeComponent<number>(world, "JumpForce", true);
export const Power = makeComponent<number>(world, "Power", true);

export const TokenMultiplier = makeComponent<number>(world, "TokenMultiplier", true);

export const Cooldown = makeComponent<number>(world, "Cooldown", true);

export const IsMeditating = makeTag(world, "IsMeditating", true);
