import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, PlayerInstance } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, playerInstance, characterInstance] of world.query(
        PlayerInstance,
        CharacterInstance,
    )) {
        const character = playerInstance.Character;

        if (character?.Parent === undefined || character === characterInstance) {
            continue;
        }

        setComponent(world, entity, CharacterInstance, playerInstance.Character);
    }
}

export const detectCharacterUpdated: SystemTable<[World]> = {
    name: "DetectCharacterUpdated",
    system,
};
