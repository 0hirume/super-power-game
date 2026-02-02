import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Character).without(Player.Torso).cached();

    function system(): void {
        for (const [entity, character] of query) {
            const torso = character.FindFirstChild("Torso");

            if (torso === undefined || !torso.IsA("BasePart")) {
                continue;
            }

            setComponent(world, entity, Player.Torso, torso, true);
        }
    }

    return { system };
}

export const trackTorsoAdded: SystemTable<[World]> = {
    name: "TrackTorsoAdded",
    system: initializer,
};
