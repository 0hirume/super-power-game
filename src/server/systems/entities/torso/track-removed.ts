import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, TorsoInstance } from "../../../../shared/components";

function system(world: World): void {
    for (const [entity, characterInstance] of world.query(CharacterInstance).with(TorsoInstance)) {
        const torso = characterInstance.FindFirstChild("Torso");

        if (torso?.FindFirstAncestorWhichIsA("DataModel") !== undefined) {
            continue;
        }

        world.remove(entity, TorsoInstance);
    }
}

export const trackTorsoRemoved: SystemTable<[World]> = {
    name: "TrackTorsoRemoved",
    system,
};
