import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import { PlayerInstance } from "../../shared/components";

const [hasPlayerLeft, collectPlayersLeft] = onEvent(Players.PlayerRemoving);

function system(world: World): void {
    for (const [_, player] of collectPlayersLeft()) {
        for (const [entity, instance] of world.query(PlayerInstance)) {
            if (player === instance) {
                world.delete(entity);
                break;
            }
        }
    }
}

export const onPlayerLeft: SystemTable<[World]> = {
    name: "OnPlayerLeft",
    runConditions: [hasPlayerLeft],
    system,
};
