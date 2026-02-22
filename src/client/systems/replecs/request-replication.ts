import type { World } from "@rbxts/jecs";

import { runOnce, type SystemTable } from "@rbxts/planck";

import { routes } from "../../../shared/routes";

function initializer(): { system: () => void } {
    function system(): void {
        routes.requestReplication.send();
    }

    return { system };
}

export const requestReplication: SystemTable<[World]> = {
    name: "RequestReplication",
    runConditions: [runOnce()],
    system: initializer,
};
