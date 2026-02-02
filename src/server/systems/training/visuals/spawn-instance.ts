import { Name, type World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import Object from "@rbxts/object-utils";
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
    const entries = Object.entries(STATUS_VISUAL_INSTANCES).map(([tag, model]) => ({
        model,
        query: world
            .query(Player.Character, Player.Torso)
            .with(tag)
            .without(pair(Visual.Instance, tag))
            .cached(),
        tag,
    }));

    function system(): void {
        for (const { model, query, tag } of entries) {
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
