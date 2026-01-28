import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { UserInputService } from "@rbxts/services";

import { routes } from "../../../shared/routes";

const [hasInput, collectInputs] = onEvent(UserInputService.InputBegan);

function system(): void {
    for (const [_, inputObject, gameProcessed] of collectInputs()) {
        if (gameProcessed) {
            continue;
        }

        switch (inputObject.UserInputType) {
            case Enum.UserInputType.MouseButton1: {
                routes.requestTrain.send();
                break;
            }
            default: {
                break;
            }
        }
    }
}

export const processMouseInputs: SystemTable<[World]> = {
    name: "ProcessMouseInputs",
    runConditions: [hasInput],
    system,
};
