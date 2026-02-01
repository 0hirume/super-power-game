import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import { Player } from "../../shared/components";
import { routes } from "../../shared/routes";

const LOCAL_PLAYER = Players.LocalPlayer;

function initializer(world: World): { system: () => void } {
    const query = world.query(Player.Instance).cached();

    function system(): void {
        for (const [_, player] of query) {
            if (player !== LOCAL_PLAYER) {
                continue;
            }

            const humanoid = player.Character?.FindFirstChildWhichIsA("Humanoid");

            if (humanoid === undefined) {
                continue;
            }

            if (humanoid.GetState() !== Enum.HumanoidStateType.Jumping) {
                continue;
            }

            routes.onHumanoidJumped.send();
        }
    }

    return { system };
}

export const trackHumanoidJumping: SystemTable<[World]> = {
    name: "TrackHumanoidJumping",
    system: initializer,
};
