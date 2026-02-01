import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character).with(Player.Humanoid).cached();

    function system(): void {
        for (const [entity, character] of query) {
            const humanoid = character.FindFirstChildWhichIsA("Humanoid");

            if (humanoid?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
                continue;
            }

            world.remove(entity, Player.Humanoid);
        }
    }

    return { system };
}

export const trackHumanoidRemoved: SystemTable<[World]> = {
    name: "TrackHumanoidRemoved",
    system: initializer,
};
