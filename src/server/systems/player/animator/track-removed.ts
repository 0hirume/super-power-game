import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Humanoid).with(Player.Animator).cached();

    function system(): void {
        for (const [entity, humanoid] of query) {
            const animator = humanoid.FindFirstChildWhichIsA("Animator");

            if (animator?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
                continue;
            }

            world.remove(entity, Player.Animator);
        }
    }

    return { system };
}

export const trackAnimatorRemoved: SystemTable<[World]> = {
    name: "TrackAnimatorRemoved",
    system: initializer,
};
