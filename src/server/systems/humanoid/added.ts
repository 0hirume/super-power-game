import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, HumanoidInstance } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, instance] of world.query(CharacterInstance).without(HumanoidInstance)) {
        const humanoid = instance.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        setComponent(world, entity, HumanoidInstance, humanoid, true);
    }
}

export const detectHumanoidAdded: SystemTable<[World]> = {
    name: "DetectHumanoidAdded",
    system,
};
