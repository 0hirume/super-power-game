import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { HumanoidInstance, AnimatorInstance } from "../../../../shared/components";

function system(world: World): void {
    for (const [entity, characterInstance] of world
        .query(HumanoidInstance)
        .with(AnimatorInstance)) {
        const animator = characterInstance.FindFirstChildWhichIsA("Animator");

        if (animator?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
            continue;
        }

        world.remove(entity, AnimatorInstance);
    }
}

export const trackAnimatorRemoved: SystemTable<[World]> = {
    name: "TrackAnimatorRemoved",
    system,
};
