import type { World } from "@rbxts/jecs";
import { runOnce, type SystemTable } from "@rbxts/planck";

import { routes } from "../../../shared/routes";

function system(): void {
    routes.startReplication.send();
}

export const replecsStartReplicationSystem: SystemTable<[World]> = {
    runConditions: [runOnce()],
    system,
};
