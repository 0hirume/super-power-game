import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character, Player.Root).cached();

    function system(): void {
        for (const [entity, character, root] of query) {
            const foundRoot = character.FindFirstChild("HumanoidRootPart");

            if (foundRoot?.FindFirstAncestorWhichIsA("DataModel") === undefined) {
                continue;
            }

            if (!foundRoot.IsA("Part") || foundRoot === root) {
                continue;
            }

            setComponent(world, entity, Player.Root, foundRoot);
        }
    }

    return { system };
}

export const trackHumanoidRootUpdated: SystemTable<[World]> = {
    name: "TrackHumanoidRootUpdated",
    system: initializer,
};
