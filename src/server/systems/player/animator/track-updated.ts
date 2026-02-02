import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Humanoid, Player.Animator).cached();

    function system(): void {
        for (const [entity, humanoid, animator] of query) {
            const foundAnimator = humanoid.FindFirstChildWhichIsA("Animator");

            if (foundAnimator?.FindFirstAncestorWhichIsA("DataModel") === undefined) {
                continue;
            }

            if (foundAnimator === animator) {
                continue;
            }

            setComponent(world, entity, Player.Animator, foundAnimator);
        }
    }

    return { system };
}

export const trackAnimatorUpdated: SystemTable<[World]> = {
    name: "TrackAnimatorUpdated",
    system: initializer,
};
