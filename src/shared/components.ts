import { makeComponent } from "./utilities/component";
import { world } from "./world";

export const PlayerInstance = makeComponent<Player>(world, "PlayerInstance", true);

export const Health = makeComponent<number>(world, "Health", true);
export const MaxHealth = makeComponent<number>(world, "MaxHealth", true);

export const Strength = makeComponent<number>(world, "Strength", true);
export const StrengthMultiplier = makeComponent<number>(world, "StrengthMultiplier", true);
export const Endurance = makeComponent<number>(world, "Endurance", true);
export const EnduranceMultiplier = makeComponent<number>(world, "EnduranceMultiplier", true);
export const Speed = makeComponent<number>(world, "Speed", true);
export const SpeedMultiplier = makeComponent<number>(world, "SpeedMultiplier", true);
export const JumpForce = makeComponent<number>(world, "JumpForce", true);
export const JumpForceMultiplier = makeComponent<number>(world, "JumpForceMultiplier", true);
export const Power = makeComponent<number>(world, "Power", true);
export const PowerMultiplier = makeComponent<number>(world, "PowerMultiplier", true);

export const CoolDown = makeComponent<number>(world, "CoolDown", true);
