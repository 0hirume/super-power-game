import type { CachedQuery, Entity } from "@rbxts/jecs";
import { Name, type Tag, type World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { ReplicatedStorage } from "@rbxts/services";

import { Player, Status, Visual } from "../../../../shared/components";
import { setPairValue } from "../../../../shared/utilities/ecs";

const STATUSES: Record<Tag, Model> = {
    [Status.EnduranceTraining]: ReplicatedStorage.assets.effects.pushup,
    [Status.PowerTraining]: ReplicatedStorage.assets.effects.meditation,
};

for (const [_, model] of pairs(STATUSES)) {
    if (model === undefined) {
        error(`Model doesn't exist`);
    }

    if (model.PrimaryPart === undefined) {
        error(`Model doesn't have a PrimaryPart`);
    }
}

function initializer(world: World): { system: () => void } {
    const queries: Record<Tag, CachedQuery<[Entity<Model>, Entity<BasePart>]>> = {};

    for (const [tag] of pairs(STATUSES)) {
        queries[tag] = world
            .query(Player.Character, Player.Torso)
            .with(tag)
            .without(pair(Visual.Instance, tag))
            .cached();
    }

    function system(): void {
        for (const [tag, model] of pairs(STATUSES)) {
            const query = queries[tag];

            if (query === undefined) {
                continue;
            }

            for (const [entity, character, torso] of query) {
                const newModel = model.Clone();
                newModel.Name = world.get(tag, Name) ?? "Effect";
                newModel.Parent = character;

                newModel.PivotTo(torso.CFrame);

                const weld = new Instance("WeldConstraint");
                weld.Part0 = newModel.PrimaryPart;
                weld.Part1 = torso;
                weld.Parent = newModel.PrimaryPart;

                setPairValue(world, entity, Visual.Instance, tag, newModel);
            }
        }
    }

    return { system };
}

export const spawnTrainingVisualEffect: SystemTable<[World]> = {
    name: "SpawnTrainingVisualEffect",
    system: initializer,
};
