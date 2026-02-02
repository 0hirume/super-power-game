import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Humanoid).without(Player.Animator).cached();

    function system(): void {
        for (const [entity, humanoid] of query) {
            const animator = humanoid.FindFirstChildWhichIsA("Animator");

            if (animator === undefined) {
                continue;
            }

            setComponent(world, entity, Player.Animator, animator, true);
        }
    }

    return { system };
}

export const trackAnimatorAdded: SystemTable<[World]> = {
    name: "TrackAnimatorAdded",
    system: initializer,
};
