import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, PlayerInstance } from "../../../../shared/components";

function system(world: World): void {
    for (const [entity, playerInstance] of world.query(PlayerInstance).with(CharacterInstance)) {
        if (playerInstance.Character?.Parent !== undefined) {
            continue;
        }

        world.remove(entity, CharacterInstance);
    }
}

export const trackCharacterRemoved: SystemTable<[World]> = {
    name: "TrackCharacterRemoved",
    system,
};
