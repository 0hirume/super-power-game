import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character).without(Player.Humanoid).cached();

    function system(): void {
        for (const [entity, character] of query) {
            const humanoid = character.FindFirstChildWhichIsA("Humanoid");

            if (humanoid === undefined) {
                continue;
            }

            setComponent(world, entity, Player.Humanoid, humanoid, true);
        }
    }

    return { system };
}

export const trackHumanoidAdded: SystemTable<[World]> = {
    name: "TrackHumanoidAdded",
    system: initializer,
};
