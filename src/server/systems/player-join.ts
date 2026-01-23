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
import { makeEntity, setComponent } from "../../shared/utilities/entity";

const [hasPlayerJoined, collectPlayersJoined] = onEvent(Players.PlayerAdded);

function system(world: World): void {
    for (const [_, player] of collectPlayersJoined()) {
        const playerEntity = makeEntity(world, true);

        setComponent(world, playerEntity, PlayerInstance, player, true);

        setComponent(world, playerEntity, Health, DEFAULT_HEALTH, true);
        setComponent(world, playerEntity, MaxHealth, DEFAULT_MAX_HEALTH, true);

        setComponent(world, playerEntity, Strength, DEFAULT_STRENGTH, true);
        setComponent(world, playerEntity, StrengthMultiplier, DEFAULT_STRENGTH_MULTIPLIER, true);
        setComponent(world, playerEntity, Endurance, DEFAULT_ENDURANCE, true);
        setComponent(world, playerEntity, EnduranceMultiplier, DEFAULT_ENDURANCE_MULTIPLIER, true);
        setComponent(world, playerEntity, Speed, DEFAULT_SPEED, true);
        setComponent(world, playerEntity, SpeedMultiplier, DEFAULT_SPEED_MULTIPLIER, true);
        setComponent(world, playerEntity, JumpForce, DEFAULT_JUMP_FORCE, true);
        setComponent(world, playerEntity, JumpForceMultiplier, DEFAULT_JUMP_FORCE_MULTIPLIER, true);
        setComponent(world, playerEntity, Power, DEFAULT_POWER, true);
        setComponent(world, playerEntity, PowerMultiplier, DEFAULT_POWER_MULTIPLIER, true);
    }
}

export const playerJoinedSystem: SystemTable<[World]> = {
    runConditions: [hasPlayerJoined],
    system,
};
