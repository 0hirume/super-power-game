import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { replicator } from "../../../shared/replicator/server";
import { routes } from "../../../shared/routes";

function initializer(): { system: () => void } {
    function system(): void {
        for (const [player, buf, variants] of replicator.collect_updates()) {
            routes.receiveUpdate.send(buf, variants).to(player);
        }
    }

    return { system };
}

export const sendUpdates: SystemTable<[World]> = {
    name: "SendUpdates",
    system: initializer,
};
