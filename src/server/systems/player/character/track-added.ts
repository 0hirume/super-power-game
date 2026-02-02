import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";
import { setComponent } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance).without(Player.Character).cached();

    function system(): void {
        for (const [entity, player] of query) {
            const character = player.Character;

            if (character?.Parent === undefined) {
                continue;
            }

            setComponent(world, entity, Player.Character, character, true);
        }
    }

    return { system };
}

export const trackCharacterAdded: SystemTable<[World]> = {
    name: "TrackCharacterAdded",
    system: initializer,
};
