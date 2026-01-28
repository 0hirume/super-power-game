import type { Entity } from "@rbxts/jecs";
import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { EnduranceValue, PowerValue, StrengthValue } from "../../../shared/components";
import {
    ActiveTrainingMode,
    EnduranceTrainingEffect,
    PowerTrainingEffect,
    StrengthTrainingEffect,
} from "../../../shared/tags";
import { addTag } from "../../../shared/utilities/ecs";

const EFFECTS: Record<Entity<number>, Tag> = {
    [StrengthValue]: StrengthTrainingEffect,
    [EnduranceValue]: EnduranceTrainingEffect,
    [PowerValue]: PowerTrainingEffect,
};

function system(world: World): void {
    for (const [component, tag] of pairs(EFFECTS)) {
        for (const [entity] of world.query(pair(ActiveTrainingMode, component)).without(tag)) {
            addTag(world, entity, tag);
        }
    }
}

export const applyTrainingModeEffects: SystemTable<[World]> = {
    name: "ApplyTrainingModeEffects",
    system,
};
