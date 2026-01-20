import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import {
    Endurance,
    EnduranceMultiplier,
    Health,
    JumpForce,
    JumpForceMultiplier,
    MaxHealth,
    PlayerInstance,
    Power,
    PowerMultiplier,
    Speed,
    SpeedMultiplier,
    Strength,
    StrengthMultiplier,
} from "../../shared/components";
import {
    DEFAULT_ENDURANCE,
    DEFAULT_ENDURANCE_MULTIPLIER,
    DEFAULT_HEALTH,
    DEFAULT_JUMP_FORCE,
    DEFAULT_JUMP_FORCE_MULTIPLIER,
    DEFAULT_MAX_HEALTH,
    DEFAULT_POWER,
    DEFAULT_POWER_MULTIPLIER,
    DEFAULT_SPEED,
    DEFAULT_SPEED_MULTIPLIER,
    DEFAULT_STRENGTH,
    DEFAULT_STRENGTH_MULTIPLIER,
} from "../../shared/constants/player";
import { makeEntity } from "../../shared/utilities/entity";

const [hasPlayerJoined, collectPlayersJoined] = onEvent(Players.PlayerAdded);

function system(world: World): void {
    for (const [_, player] of collectPlayersJoined()) {
        const playerEntity = makeEntity(world, true);

        world.set(playerEntity, PlayerInstance, player);

        world.set(playerEntity, Health, DEFAULT_HEALTH);
        world.set(playerEntity, MaxHealth, DEFAULT_MAX_HEALTH);

        world.set(playerEntity, Strength, DEFAULT_STRENGTH);
        world.set(playerEntity, StrengthMultiplier, DEFAULT_STRENGTH_MULTIPLIER);
        world.set(playerEntity, Endurance, DEFAULT_ENDURANCE);
        world.set(playerEntity, EnduranceMultiplier, DEFAULT_ENDURANCE_MULTIPLIER);
        world.set(playerEntity, Speed, DEFAULT_SPEED);
        world.set(playerEntity, SpeedMultiplier, DEFAULT_SPEED_MULTIPLIER);
        world.set(playerEntity, JumpForce, DEFAULT_JUMP_FORCE);
        world.set(playerEntity, JumpForceMultiplier, DEFAULT_JUMP_FORCE_MULTIPLIER);
        world.set(playerEntity, Power, DEFAULT_POWER);
        world.set(playerEntity, PowerMultiplier, DEFAULT_POWER_MULTIPLIER);
    }
}

export const playerJoinedSystem: SystemTable<[World]> = {
    runConditions: [hasPlayerJoined],
    system,
};
