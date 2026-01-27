import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, HumanoidInstance } from "../../../shared/components";

function system(world: World): void {
    for (const [entity, characterInstance] of world
        .query(CharacterInstance)
        .with(HumanoidInstance)) {
        const humanoid = characterInstance.FindFirstChildWhichIsA("Humanoid");

        if (humanoid?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
            continue;
        }

        world.remove(entity, HumanoidInstance);
    }
}

export const detectHumanoidRemoved: SystemTable<[World]> = {
    name: "DetectHumanoidRemoved",
    system,
};
