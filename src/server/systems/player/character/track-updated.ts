import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance, Player.Character).cached();

    function system(): void {
        for (const [entity, player, character] of query) {
            const foundCharacter = player.Character;

            if (foundCharacter?.Parent === undefined || foundCharacter === character) {
                continue;
            }

            setComponent(world, entity, Player.Character, foundCharacter);
        }
    }

    return { system };
}

export const trackCharacterUpdated: SystemTable<[World]> = {
    name: "TrackCharacterUpdated",
    system: initializer,
};
