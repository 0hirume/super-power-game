import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character, Player.Torso).cached();

    function system(): void {
        for (const [entity, character, torso] of query) {
            const foundTorso = character.FindFirstChild("Torso");

            if (foundTorso?.FindFirstAncestorWhichIsA("DataModel") === undefined) {
                continue;
            }

            if (!foundTorso.IsA("BasePart") || foundTorso === torso) {
                continue;
            }

            setComponent(world, entity, Player.Root, foundTorso);
        }
    }

    return { system };
}

export const trackTorsoUpdated: SystemTable<[World]> = {
    name: "TrackTorsoUpdated",
    system: initializer,
};
