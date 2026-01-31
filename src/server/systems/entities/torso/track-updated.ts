import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, TorsoInstance } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, characterInstance, rootInstance] of world.query(
        CharacterInstance,
        TorsoInstance,
    )) {
        const torso = characterInstance.FindFirstChild("Torso");

        if (torso?.FindFirstAncestorWhichIsA("DataModel") === undefined || !torso.IsA("Part")) {
            continue;
        }

        if (torso === rootInstance) {
            continue;
        }

        setComponent(world, entity, TorsoInstance, torso);
    }
}

export const trackTorsoUpdated: SystemTable<[World]> = {
    name: "TrackTorsoUpdated",
    system,
};
