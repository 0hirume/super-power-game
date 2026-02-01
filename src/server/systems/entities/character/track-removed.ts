import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player } from "../../../../shared/components";

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance).with(Player.Character).cached();

    function system(): void {
        for (const [entity, player] of query) {
            if (player.Character?.Parent !== undefined) {
                continue;
            }

            world.remove(entity, Player.Character);
        }
    }

    return { system };
}

export const trackCharacterRemoved: SystemTable<[World]> = {
    name: "TrackCharacterRemoved",
    system: initializer,
};
