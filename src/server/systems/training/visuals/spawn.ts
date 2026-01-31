import { Name, type Tag, type World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { ReplicatedStorage } from "@rbxts/services";

import {
    CharacterInstance,
    TorsoInstance,
    VisualEffectInstance,
} from "../../../../shared/components";
import { PowerTrainingEffect } from "../../../../shared/tags";
import { setPairValue } from "../../../../shared/utilities/ecs";

const EFFECTS: Record<Tag, Model> = {
    [PowerTrainingEffect]: ReplicatedStorage.assets.effects.meditation,
};

for (const [_, model] of pairs(EFFECTS)) {
    if (model === undefined) {
        error(`Model doesn't exist`);
    }

    if (model.PrimaryPart === undefined) {
        error(`Model doesn't have a PrimaryPart`);
    }
}

function system(world: World): void {
    for (const [tag, model] of pairs(EFFECTS)) {
        for (const [entity, characterInstance, torsoInstance] of world
            .query(CharacterInstance, TorsoInstance)
            .with(tag)
            .without(pair(VisualEffectInstance, tag))) {
            const newModel = model.Clone();
            newModel.Name = world.get(tag, Name) ?? "Effect";
            newModel.Parent = characterInstance;

            newModel.PivotTo(torsoInstance.CFrame);

            const weld = new Instance("WeldConstraint");
            weld.Part0 = newModel.PrimaryPart;
            weld.Part1 = torsoInstance;
            weld.Parent = newModel.PrimaryPart;

            setPairValue(world, entity, VisualEffectInstance, tag, newModel);
        }
    }
}

export const spawnTrainingVisualEffect: SystemTable<[World]> = {
    name: "SpawnTrainingVisualEffect",
    system,
};
