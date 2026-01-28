import { Name, type Tag, type World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { ReplicatedStorage } from "@rbxts/services";

import {
    CharacterInstance,
    HumanoidRootInstance,
    VisualEffectInstance,
} from "../../../../shared/components";
import { PowerTrainingEffect } from "../../../../shared/tags";
import { setPairValue } from "../../../../shared/utilities/ecs";

const powerTrainingVisualEffectModel = ReplicatedStorage.FindFirstChild("assets")!
    .FindFirstChild("effects")!
    .FindFirstChild("meditation")! as Model;

const EFFECTS: Record<Tag, Model> = {
    [PowerTrainingEffect]: powerTrainingVisualEffectModel,
};

function system(world: World): void {
    for (const [tag, model] of pairs(EFFECTS)) {
        for (const [entity, characterInstance, rootInstance] of world
            .query(CharacterInstance, HumanoidRootInstance)
            .with(tag)
            .without(pair(VisualEffectInstance, tag))) {
            const newModel = model.Clone();
            newModel.Name = world.get(tag, Name) ?? "Effect";
            newModel.Parent = characterInstance;

            newModel.PivotTo(rootInstance.CFrame);

            const weld = new Instance("WeldConstraint");
            weld.Part0 = newModel.PrimaryPart;
            weld.Part1 = rootInstance;
            weld.Parent = newModel.PrimaryPart;

            setPairValue(world, entity, VisualEffectInstance, tag, newModel);
        }
    }
}

export const spawnTrainingVisualEffect: SystemTable<[World]> = {
    name: "SpawnTrainingVisualEffect",
    system,
};
