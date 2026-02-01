import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player, Value } from "../../../shared/components";
import { BASE } from "../../../shared/constants/player";

function initializer(world: World): { system: () => void } {
    const query = world
        .query(Player.Humanoid, Value.Health, Value.Endurance, Value.Speed, Value.JumpForce)
        .cached();

    function system(): void {
        for (const [_, instance, health, endurance, speed, jumpForce] of query) {
            instance.UseJumpPower = false;

            instance.Health = health;
            instance.MaxHealth = BASE.HEALTH + endurance;

            instance.WalkSpeed = BASE.WALKSPEED + speed;
            instance.JumpHeight = BASE.JUMPHEIGHT + jumpForce;
        }
    }

    return { system };
}

export const reconcileHumanoids: SystemTable<[World]> = {
    name: "ReconcileHumanoids",
    system: initializer,
};
