import type { CachedQuery, Entity } from "@rbxts/jecs";
import { Name, type Tag, type World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player, Visual } from "../../../../shared/components";
import { STATUS_VISUAL_INSTANCES } from "../../../../shared/constants/components";
import { setPairValue } from "../../../../shared/utilities/ecs";

for (const [_, model] of pairs(STATUS_VISUAL_INSTANCES)) {
    if (model === undefined) {
        error(`Model doesn't exist`);
    }

    if (model.PrimaryPart === undefined) {
        error(`Model doesn't have a PrimaryPart`);
    }
}

function initializer(world: World): { system: () => void } {
    const queries: Record<Tag, CachedQuery<[Entity<Model>, Entity<BasePart>]>> = {};

    for (const [tag] of pairs(STATUS_VISUAL_INSTANCES)) {
        queries[tag] = world
            .query(Player.Character, Player.Torso)
            .with(tag)
            .without(pair(Visual.Instance, tag))
            .cached();
    }

    function system(): void {
        for (const [tag, model] of pairs(STATUS_VISUAL_INSTANCES)) {
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
