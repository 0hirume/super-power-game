import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, TorsoInstance } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, instance] of world.query(CharacterInstance).without(TorsoInstance)) {
        const torso = instance.FindFirstChild("Torso");

        if (torso === undefined || !torso.IsA("BasePart")) {
            continue;
        }

        setComponent(world, entity, TorsoInstance, torso, true);
    }
}

export const trackTorsoAdded: SystemTable<[World]> = {
    name: "TrackTorsoAdded",
    system,
};
