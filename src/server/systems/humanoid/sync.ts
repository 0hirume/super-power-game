import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Endurance, Health, HumanoidInstance, JumpForce, Speed } from "../../../shared/components";
import { BASE_JUMPHEIGHT, BASE_MAX_HEALTH, BASE_WALKSPEED } from "../../../shared/constants/player";

function system(world: World): void {
    for (const [
        _,
        instance,
        healthValue,
        enduranceValue,
        speedValue,
        jumpForceValue,
    ] of world.query(HumanoidInstance, Health, Endurance, Speed, JumpForce)) {
        instance.UseJumpPower = false;

        instance.Health = healthValue;
        instance.MaxHealth = BASE_MAX_HEALTH + enduranceValue;

        instance.WalkSpeed = BASE_WALKSPEED + speedValue;
        instance.JumpHeight = BASE_JUMPHEIGHT + jumpForceValue;
    }
}

export const syncHumanoidSystem: SystemTable<[World]> = {
    name: "SyncHumanoid",
    system,
};
