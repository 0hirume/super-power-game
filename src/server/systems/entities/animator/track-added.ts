import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { AnimatorInstance, HumanoidInstance } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, instance] of world.query(HumanoidInstance).without(AnimatorInstance)) {
        const animator = instance.FindFirstChildWhichIsA("Animator");

        if (animator === undefined) {
            continue;
        }

        setComponent(world, entity, AnimatorInstance, animator, true);
    }
}

export const trackAnimatorAdded: SystemTable<[World]> = {
    name: "TrackAnimatorAdded",
    system,
};
