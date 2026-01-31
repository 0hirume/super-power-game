import type { Entity } from "@rbxts/jecs";
import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { EnduranceValue, PowerValue, StrengthValue } from "../../../../shared/components";
import {
    ActiveTrainingMode,
    EnduranceTrainingEffect,
    PowerTrainingEffect,
    StrengthTrainingEffect,
} from "../../../../shared/tags";

const EFFECTS: Record<Entity<number>, Tag> = {
    [StrengthValue]: StrengthTrainingEffect,
    [EnduranceValue]: EnduranceTrainingEffect,
    [PowerValue]: PowerTrainingEffect,
};

function system(world: World): void {
    for (const [component, tag] of pairs(EFFECTS)) {
        for (const [entity] of world.query(tag).without(pair(ActiveTrainingMode, component))) {
            world.remove(entity, tag);
        }
    }
}

export const removeTrainingModeEffects: SystemTable<[World]> = {
    name: "RemoveTrainingModeEffects",
    system,
};
