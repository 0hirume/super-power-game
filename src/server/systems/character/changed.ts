import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, PlayerInstance } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, playerInstance, characterInstance] of world.query(
        PlayerInstance,
        CharacterInstance,
    )) {
        if (playerInstance.Character === characterInstance) {
            continue;
        }

        if (playerInstance.Character === undefined) {
            continue;
        }

        setComponent(world, entity, CharacterInstance, playerInstance.Character);
    }
}

export const characterChangedSystem: SystemTable<[World]> = {
    name: "CharacterChanged",
    system,
};
