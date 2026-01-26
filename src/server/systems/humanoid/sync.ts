import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Endurance, Health, JumpForce, PlayerInstance, Speed } from "../../../shared/components";
import { BASE_JUMPHEIGHT, BASE_MAX_HEALTH, BASE_WALKSPEED } from "../../../shared/constants/player";

function system(world: World): void {
    for (const [
        _,
        instance,
        healthValue,
        enduranceValue,
        speedValue,
        jumpForceValue,
    ] of world.query(PlayerInstance, Health, Endurance, Speed, JumpForce)) {
        const humanoid = instance.Character?.FindFirstChildWhichIsA("Humanoid");

        if (humanoid === undefined) {
            continue;
        }

        humanoid.UseJumpPower = false;

        humanoid.Health = healthValue;
        humanoid.MaxHealth = BASE_MAX_HEALTH + enduranceValue;

        humanoid.WalkSpeed = BASE_WALKSPEED + speedValue;
        humanoid.JumpHeight = BASE_JUMPHEIGHT + jumpForceValue;
    }
}

export const syncHumanoidSystem: SystemTable<[World]> = {
    system,
};
