import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { replicator } from "../../../shared/replicator/client";
import { routes } from "../../../shared/routes";

function initializer(): { system: () => void } {
    function system(): void {
        for (const [, _, buf, variants] of routes.receiveUpdate.query()) {
            replicator.apply_updates(buf, variants);
        }
    }

    return { system };
}

export const applyUpdates: SystemTable<[World]> = {
    name: "ApplyUpdates",
    system: initializer,
};
