import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, PlayerInstance } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, playerInstance, characterInstance] of world.query(
        PlayerInstance,
        CharacterInstance,
    )) {
        if (playerInstance.Character === undefined) {
            world.remove(entity, CharacterInstance);
            continue;
        }

        if (playerInstance.Character.Parent === undefined) {
            world.remove(entity, CharacterInstance);
            continue;
        }

        if (playerInstance.Character === characterInstance) {
            continue;
        }

        setComponent(world, entity, CharacterInstance, playerInstance.Character);
    }
}

export const detectCharacterChanged: SystemTable<[World]> = {
    name: "DetectCharacterChanged",
    system,
};
