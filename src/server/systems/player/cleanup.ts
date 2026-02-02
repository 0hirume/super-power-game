import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import { Player } from "../../../shared/components";

const [hasPlayerLeft, collectPlayersLeft] = onEvent(Players.PlayerRemoving);

function system(world: World): void {
    for (const [_, player] of collectPlayersLeft()) {
        for (const [entity, instance] of world.query(Player.Instance)) {
            if (player === instance) {
                world.delete(entity);
                break;
            }
        }
    }
}

export const cleanupPlayer: SystemTable<[World]> = {
    name: "CleanupPlayer",
    runConditions: [hasPlayerLeft],
    system,
};
