import type { VisualEffectModel } from "../types";
import type { Entity, Tag } from "@rbxts/jecs";
import { ReplicatedStorage } from "@rbxts/services";

import animations from "../animations";
import { Status, Value } from "../components";
import { makeAnimation } from "../utilities/animations";

export const STAT_COMPONENTS: Entity<number>[] = [
    Value.Strength,
    Value.Endurance,
    Value.Speed,
    Value.JumpForce,
    Value.Power,
] as const;

export const STATUS_TAGS: Tag[] = [
    Status.StrengthTraining,
    Status.EnduranceTraining,
    Status.PowerTraining,
] as const;

export const STAT_STATUS_MAP: Record<Entity<number>, Tag> = {
    [Value.Strength]: Status.StrengthTraining,
    [Value.Endurance]: Status.EnduranceTraining,
    [Value.Power]: Status.PowerTraining,
} as const;

export const STATUS_VISUAL_ANIMATIONS: Record<Tag, Animation> = {
    [Status.EnduranceTraining]: makeAnimation(animations["pushup.rbxm"]),
    [Status.PowerTraining]: makeAnimation(animations["meditation.rbxm"]),
} as const;

export const STATUS_VISUAL_INSTANCES: Record<Tag, VisualEffectModel> = {
    [Status.EnduranceTraining]: ReplicatedStorage.assets.effects.pushup,
    [Status.PowerTraining]: ReplicatedStorage.assets.effects.meditation,
} as const;
