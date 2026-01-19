import type { World } from "@rbxts/jecs";
import { PlayerInstance } from "../../shared/components";
import { Players } from "@rbxts/services";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";

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

export const playerLeftSystem: SystemTable<[World]> = {
    runConditions: [hasPlayerLeft],
    system,
};
