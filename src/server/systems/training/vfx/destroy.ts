import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { VisualEffectInstance } from "../../../../shared/components";
import {
    EnduranceTrainingEffect,
    PowerTrainingEffect,
    StrengthTrainingEffect,
} from "../../../../shared/tags";

const EFFECTS: Tag[] = [StrengthTrainingEffect, EnduranceTrainingEffect, PowerTrainingEffect];

function system(world: World): void {
    for (const tag of EFFECTS) {
        for (const [entity, model] of world.query(pair(VisualEffectInstance, tag)).without(tag)) {
            world.remove(entity, pair(VisualEffectInstance, tag));
            model.Destroy();
        }
    }
}

export const destroyTrainingVisualEffect: SystemTable<[World]> = {
    name: "DestroyTrainingVisualEffect",
    system,
};
