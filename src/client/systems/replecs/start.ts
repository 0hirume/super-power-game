import type { World } from "@rbxts/jecs";
import { runOnce, type SystemTable } from "@rbxts/planck";

import { routes } from "../../../shared/routes";

function system(): void {
    routes.requestReplication.send();
}

export const replecsStartReplicationSystem: SystemTable<[World]> = {
    name: "ReplecsStartReplication",
    runConditions: [runOnce()],
    system,
};
