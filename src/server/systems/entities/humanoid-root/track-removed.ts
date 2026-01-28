import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, HumanoidRootInstance } from "../../../../shared/components";

function system(world: World): void {
    for (const [entity, characterInstance] of world
        .query(CharacterInstance)
        .with(HumanoidRootInstance)) {
        const root = characterInstance.FindFirstChild("HumanoidRootPart");

        if (root?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
            continue;
        }

        world.remove(entity, HumanoidRootInstance);
    }
}

export const trackHumanoidRootRemoved: SystemTable<[World]> = {
    name: "TrackHumanoidRootRemoved",
    system,
};
