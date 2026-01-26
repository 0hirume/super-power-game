import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { UserInputService } from "@rbxts/services";

import { Endurance, Power, Strength } from "../../../shared/components";
import { routes } from "../../../shared/routes";

const [hasInput, collectInputs] = onEvent(UserInputService.InputBegan);

function system(): void {
    for (const [_, inputObject, gameProcessed] of collectInputs()) {
        if (gameProcessed) {
            continue;
        }

        switch (inputObject.KeyCode) {
            case Enum.KeyCode.One: {
                routes.setTrainingMode.send(Strength);
                break;
            }
            case Enum.KeyCode.Two: {
                routes.setTrainingMode.send(Endurance);
                break;
            }
            case Enum.KeyCode.Three: {
                routes.setTrainingMode.send(Power);
                break;
            }
            default: {
                break;
            }
        }
    }
}

export const processKeyInputsSystem: SystemTable<[World]> = {
    runConditions: [hasInput],
    system,
};
