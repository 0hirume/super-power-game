import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { UserInputService } from "@rbxts/services";
import { routes } from "../../shared/routes";
import type { World } from "@rbxts/jecs";

const [hasInput, collectInputs] = onEvent(UserInputService.InputBegan);

function system(): void {
    for (const [_, inputObject, gameProcessed] of collectInputs()) {
        if (gameProcessed) {
            continue;
        }

        switch (inputObject.KeyCode) {
            case Enum.KeyCode.One: {
                routes.trainStrength.send();
                break;
            }
            case Enum.KeyCode.Two: {
                routes.trainEndurance.send();
                break;
            }
            case Enum.KeyCode.Three: {
                routes.trainPower.send();
                break;
            }
            default: {
                break;
            }
        }
    }
}

export const processInputsSystem: SystemTable<[World]> = {
    runConditions: [hasInput],
    system,
};
