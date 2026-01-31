import { makeComponent } from "./utilities/ecs";
import { world } from "./world";

export const PlayerInstance = makeComponent<Player>(world, "PlayerInstance", true);
export const CharacterInstance = makeComponent<Model>(world, "CharacterInstance", true);
export const HumanoidInstance = makeComponent<Humanoid>(world, "HumanoidInstance", true);
export const HumanoidRootInstance = makeComponent<Part>(world, "HumanoidRootInstance", true);
export const AnimatorInstance = makeComponent<Animator>(world, "AnimatorInstance", true);
export const VisualEffectInstance = makeComponent<Model>(world, "VisualEffectInstance");
export const AnimationTrackInstance = makeComponent<AnimationTrack>(world, "AnimationTrack");

export const HealthValue = makeComponent<number>(world, "Health", true);
export const StrengthValue = makeComponent<number>(world, "Strength", true);
export const EnduranceValue = makeComponent<number>(world, "Endurance", true);
export const SpeedValue = makeComponent<number>(world, "Speed", true);
export const JumpForceValue = makeComponent<number>(world, "JumpForce", true);
export const PowerValue = makeComponent<number>(world, "Power", true);

export const TokenMultiplier = makeComponent<number>(world, "TokenMultiplier", true);

export const Cooldown = makeComponent<number>(world, "Cooldown");
