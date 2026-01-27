import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, HumanoidRootInstance } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, instance] of world.query(CharacterInstance).without(HumanoidRootInstance)) {
        const root = instance.FindFirstChild("HumanoidRootPart");

        if (root === undefined || !root.IsA("Part")) {
            continue;
        }

        setComponent(world, entity, HumanoidRootInstance, root, true);
    }
}

export const humanoidRootAddedSystem: SystemTable<[World]> = {
    name: "HumanoidRootAdded",
    system,
};
