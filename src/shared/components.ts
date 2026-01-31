import { makeComponent } from "./utilities/ecs";
import { world } from "./world";

export const PlayerInstance = makeComponent<Player>(world, "Player", true);
export const CharacterInstance = makeComponent<Model>(world, "Character", true);
export const HumanoidInstance = makeComponent<Humanoid>(world, "Humanoid", true);
export const HumanoidRootInstance = makeComponent<Part>(world, "HumanoidRoot", true);
export const AnimatorInstance = makeComponent<Animator>(world, "Animator", true);
export const TorsoInstance = makeComponent<BasePart>(world, "Torso", true);
export const VisualEffectInstance = makeComponent<Model>(world, "VisualEffect");
export const AnimationTrackInstance = makeComponent<AnimationTrack>(world, "AnimationTrack");

export const HealthValue = makeComponent<number>(world, "Health", true);
export const StrengthValue = makeComponent<number>(world, "Strength", true);
export const EnduranceValue = makeComponent<number>(world, "Endurance", true);
export const SpeedValue = makeComponent<number>(world, "Speed", true);
export const JumpForceValue = makeComponent<number>(world, "JumpForce", true);
export const PowerValue = makeComponent<number>(world, "Power", true);

export const TokenMultiplier = makeComponent<number>(world, "TokenMultiplier", true);

export const Cooldown = makeComponent<number>(world, "Cooldown");
