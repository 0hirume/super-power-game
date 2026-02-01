import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { UserInputService } from "@rbxts/services";

import { Value } from "../../../shared/components";
import { routes } from "../../../shared/routes";

const [hasInput, collectInputs] = onEvent(UserInputService.InputBegan);

function initializer(): { system: () => void } {
    function system(): void {
        for (const [_, inputObject, gameProcessed] of collectInputs()) {
            if (gameProcessed) {
                continue;
            }

            switch (inputObject.KeyCode) {
                case Enum.KeyCode.One: {
                    routes.requestTrainingModeChange.send(Value.Strength);
                    break;
                }
                case Enum.KeyCode.Two: {
                    routes.requestTrainingModeChange.send(Value.Endurance);
                    break;
                }
                case Enum.KeyCode.Three: {
                    routes.requestTrainingModeChange.send(Value.Power);
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

export const processKeyInputs: SystemTable<[World]> = {
    name: "ProcessKeyInputs",
    runConditions: [hasInput],
    system: initializer,
};
