import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { replicator } from "../../../shared/replicator/client";
import { routes } from "../../../shared/routes";

function initializer(): { system: () => void } {
    function system(): void {
        for (const [, _, buf, variants] of routes.receiveFull.query()) {
            replicator.apply_full(buf, variants);
        }
    }

    return { system };
}

export const applyFull: SystemTable<[World]> = {
    name: "ApplyFull",
    system: initializer,
};
