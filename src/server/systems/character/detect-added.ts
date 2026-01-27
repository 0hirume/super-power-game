import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { CharacterInstance, PlayerInstance } from "../../../shared/components";
import { setComponent } from "../../../shared/utilities/ecs";

function system(world: World): void {
    for (const [entity, instance] of world.query(PlayerInstance).without(CharacterInstance)) {
        const character = instance.Character;

        if (character?.Parent === undefined) {
            continue;
        }

        setComponent(world, entity, CharacterInstance, instance.Character, true);
    }
}

export const detectCharacterAdded: SystemTable<[World]> = {
    name: "DetectCharacterAdded",
    system,
};
