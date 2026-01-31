import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { HumanoidInstance, AnimatorInstance } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, characterInstance, humanoidInstance] of world.query(
        HumanoidInstance,
        AnimatorInstance,
    )) {
        const animator = characterInstance.FindFirstChildWhichIsA("Animator");

        if (animator?.FindFirstAncestorWhichIsA("DataModel") === undefined) {
            continue;
        }

        if (animator === humanoidInstance) {
            continue;
        }

        setComponent(world, entity, AnimatorInstance, animator);
    }
}

export const trackAnimatorUpdated: SystemTable<[World]> = {
    name: "TrackAnimatorUpdated",
    system,
};
