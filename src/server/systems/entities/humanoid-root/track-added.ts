import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character).without(Player.Root).cached();

    function system(): void {
        for (const [entity, character] of query) {
            const root = character.FindFirstChild("HumanoidRootPart");

            if (root === undefined || !root.IsA("Part")) {
                continue;
            }

            setComponent(world, entity, Player.Root, root, true);
        }
    }

    return { system };
}

export const trackHumanoidRootAdded: SystemTable<[World]> = {
    name: "TrackHumanoidRootAdded",
    system: initializer,
};
