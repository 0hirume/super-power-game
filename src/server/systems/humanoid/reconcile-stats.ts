import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import {
    EnduranceValue,
    HealthValue,
    HumanoidInstance,
    JumpForceValue,
    SpeedValue,
} from "../../../shared/components";
import { BASE_JUMPHEIGHT, BASE_MAX_HEALTH, BASE_WALKSPEED } from "../../../shared/constants/player";

function system(world: World): void {
    for (const [
        _,
        instance,
        healthValue,
        enduranceValue,
        speedValue,
        jumpForceValue,
    ] of world.query(HumanoidInstance, HealthValue, EnduranceValue, SpeedValue, JumpForceValue)) {
        instance.UseJumpPower = false;

        instance.Health = healthValue;
        instance.MaxHealth = BASE_MAX_HEALTH + enduranceValue;

        instance.WalkSpeed = BASE_WALKSPEED + speedValue;
        instance.JumpHeight = BASE_JUMPHEIGHT + jumpForceValue;
    }
}

export const reconcileHumanoidStats: SystemTable<[World]> = {
    name: "ReconcileHumanoidStats",
    system,
};
