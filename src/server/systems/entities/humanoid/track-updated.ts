import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, HumanoidInstance } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, characterInstance, humanoidInstance] of world.query(
        CharacterInstance,
        HumanoidInstance,
    )) {
        const humanoid = characterInstance.FindFirstChildWhichIsA("Humanoid");

        if (humanoid?.FindFirstAncestorWhichIsA("DataModel") === undefined) {
            continue;
        }

        if (humanoid === humanoidInstance) {
            continue;
        }

        setComponent(world, entity, HumanoidInstance, humanoid);
    }
}

export const trackHumanoidUpdated: SystemTable<[World]> = {
    name: "TrackHumanoidUpdated",
    system,
};
