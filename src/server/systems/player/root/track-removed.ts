import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character).with(Player.Root).cached();

    function system(): void {
        for (const [entity, character] of query) {
            const root = character.FindFirstChild("HumanoidRootPart");

            if (root?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
                continue;
            }

            world.remove(entity, Player.Root);
        }
    }

    return { system };
}

export const trackHumanoidRootRemoved: SystemTable<[World]> = {
    name: "TrackHumanoidRootRemoved",
    system: initializer,
};
