import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { UserInputService } from "@rbxts/services";

import { routes } from "../../../shared/routes";

const [hasInput, collectInputs] = onEvent(UserInputService.InputBegan);

function initializer(): { system: () => void } {
    function system(): void {
        for (const [_, input, gameProcessed] of collectInputs()) {
            if (gameProcessed) {
                continue;
            }

            switch (input.UserInputType) {
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

    return { system };
}

export const processMouseInputs: SystemTable<[World]> = {
    name: "ProcessMouseInputs",
    runConditions: [hasInput],
    system: initializer,
};
