import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, HumanoidRootInstance } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, characterInstance, rootInstance] of world.query(
        CharacterInstance,
        HumanoidRootInstance,
    )) {
        const root = characterInstance.FindFirstChild("HumanoidRootPart");

        if (root?.FindFirstAncestorWhichIsA("DataModel") === undefined || !root.IsA("Part")) {
            continue;
        }

        if (root === rootInstance) {
            continue;
        }

        setComponent(world, entity, HumanoidRootInstance, root);
    }
}

export const trackHumanoidRootUpdated: SystemTable<[World]> = {
    name: "TrackHumanoidRootUpdated",
    system,
};
