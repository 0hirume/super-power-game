import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import { PlayerInstance } from "../../shared/components";
import { routes } from "../../shared/routes";

const LOCAL_PLAYER = Players.LocalPlayer;

function system(world: World): void {
    for (const [_, playerInstance] of world.query(PlayerInstance)) {
        if (playerInstance !== LOCAL_PLAYER) {
            continue;
        }

        const humanoid = playerInstance.Character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        if (humanoid.GetState() !== Enum.HumanoidStateType.Jumping) {
            continue;
        }

        routes.humanoidJumped.send();
    }
}

export const detectHumanoidJumped: SystemTable<[World]> = {
    name: "DetectHumanoidJumped",
    system,
};
