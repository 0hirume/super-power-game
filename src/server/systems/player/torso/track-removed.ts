import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character).with(Player.Torso).cached();

    function system(): void {
        for (const [entity, character] of query) {
            const torso = character.FindFirstChild("Torso");

            if (torso?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
                continue;
            }

            world.remove(entity, Player.Torso);
        }
    }

    return { system };
}

export const trackTorsoRemoved: SystemTable<[World]> = {
    name: "TrackTorsoRemoved",
    system: initializer,
};
