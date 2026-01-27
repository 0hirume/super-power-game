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
                routes.train.send();
                break;
            }
            default: {
                break;
            }
        }
    }
}

export const onMouseInput: SystemTable<[World]> = {
    name: "OnMouseInputs",
    runConditions: [hasInput],
    system,
};
