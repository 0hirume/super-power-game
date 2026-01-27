import type { World } from "@rbxts/jecs";
import { runOnce, type SystemTable } from "@rbxts/planck";

import { routes } from "../../../shared/routes";

function system(): void {
    routes.requestReplication.send();
}

export const requestReplication: SystemTable<[World]> = {
    name: "RequestReplication",
    runConditions: [runOnce()],
    system,
};
