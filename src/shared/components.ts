import { makeComponent, makeTag } from "./utilities/ecs";
import { world } from "./world";

export namespace Player {
    export const Instance = makeComponent<Player>(world, "Player", true);
    export const Character = makeComponent<Model>(world, "Character", true);
    export const Humanoid = makeComponent<Humanoid>(world, "Humanoid", true);
    export const Root = makeComponent<Part>(world, "HumanoidRoot", true);
    export const Animator = makeComponent<Animator>(world, "Animator", true);
    export const Torso = makeComponent<BasePart>(world, "Torso", true);
}

export namespace Value {
    export const Health = makeComponent<number>(world, "Health", true);
    export const Strength = makeComponent<number>(world, "Strength", true);
    export const Endurance = makeComponent<number>(world, "Endurance", true);
    export const Speed = makeComponent<number>(world, "Speed", true);
    export const JumpForce = makeComponent<number>(world, "JumpForce", true);
    export const Power = makeComponent<number>(world, "Power", true);
    export const Cooldown = makeComponent<number>(world, "Cooldown");
}

export namespace Multiplier {
    export const Token = makeComponent<number>(world, "TokenMultiplier", true);
}

export namespace Action {
    export const Train = makeTag(world, "Train");
    export const Punch = makeTag(world, "Punch");
}

export namespace Status {
    export const TrainingMode = makeTag(world, "TrainingMode");
    export const EnduranceTraining = makeTag(world, "EnduranceTraining");
    export const PowerTraining = makeTag(world, "PowerTraining");
    export const MovementFrozen = makeTag(world, "MovementFrozen");
}

export namespace Visual {
    export const Instance = makeComponent<Model>(world, "VisualInstance");
    export const AnimationTrack = makeComponent<AnimationTrack>(world, "VisualAnimation");
}
