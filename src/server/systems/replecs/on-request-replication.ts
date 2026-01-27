import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { replicator } from "../../../shared/replicator/server";
import { routes } from "../../../shared/routes";

function system(): void {
    for (const [_, player] of routes.requestReplication.query()) {
        if (!typeIs(player, "Instance") || !player.IsA("Player")) {
            continue;
        }

        replicator.mark_player_ready(player);

        const [buf, variants] = replicator.get_full(player);
        routes.receiveFull.send(buf, variants).to(player);
    }
}

export const onRequestReplication: SystemTable<[World]> = {
    name: "OnRequestReplication",
    system,
};
