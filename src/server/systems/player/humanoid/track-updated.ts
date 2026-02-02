import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character, Player.Humanoid).cached();

    function system(): void {
        for (const [entity, character, humanoid] of query) {
            const foundHumanoid = character.FindFirstChildWhichIsA("Humanoid");

            if (foundHumanoid?.FindFirstAncestorWhichIsA("DataModel") === undefined) {
                continue;
            }

            if (foundHumanoid === humanoid) {
                continue;
            }

            setComponent(world, entity, Player.Humanoid, foundHumanoid);
        }
    }

    return { system };
}

export const trackHumanoidUpdated: SystemTable<[World]> = {
    name: "TrackHumanoidUpdated",
    system: initializer,
};
