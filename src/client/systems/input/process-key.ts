import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { UserInputService } from "@rbxts/services";

import { EnduranceValue, PowerValue, StrengthValue } from "../../../shared/components";
import { routes } from "../../../shared/routes";

const [hasInput, collectInputs] = onEvent(UserInputService.InputBegan);

function system(): void {
    for (const [_, inputObject, gameProcessed] of collectInputs()) {
        if (gameProcessed) {
            continue;
        }

        switch (inputObject.KeyCode) {
            case Enum.KeyCode.One: {
                routes.requestTrainingModeChange.send(StrengthValue);
                break;
            }
            case Enum.KeyCode.Two: {
                routes.requestTrainingModeChange.send(EnduranceValue);
                break;
            }
            case Enum.KeyCode.Three: {
                routes.requestTrainingModeChange.send(PowerValue);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export const processKeyInputs: SystemTable<[World]> = {
    name: "ProcessKeyInputs",
    runConditions: [hasInput],
    system,
};
