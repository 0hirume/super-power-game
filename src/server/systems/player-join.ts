import type { Entity, World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import {
    Endurance,
    Health,
    JumpForce,
    MaxHealth,
    PlayerInstance,
    Power,
    Speed,
    Strength,
    TokenMultiplier,
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
import { makeEntity, setComponent, setPairValue } from "../../shared/utilities/ecs";

const STATS: { component: Entity; multiplier: number; value: number }[] = [
    {
        component: Strength,
        multiplier: DEFAULT_STRENGTH_MULTIPLIER,
        value: DEFAULT_STRENGTH,
    },
    {
        component: Endurance,
        multiplier: DEFAULT_ENDURANCE_MULTIPLIER,
        value: DEFAULT_ENDURANCE,
    },
    {
        component: Speed,
        multiplier: DEFAULT_SPEED_MULTIPLIER,
        value: DEFAULT_SPEED,
    },
    {
        component: JumpForce,
        multiplier: DEFAULT_JUMP_FORCE_MULTIPLIER,
        value: DEFAULT_JUMP_FORCE,
    },
    {
        component: Power,
        multiplier: DEFAULT_POWER_MULTIPLIER,
        value: DEFAULT_POWER,
    },
];

const [hasPlayerJoined, collectPlayersJoined] = onEvent(Players.PlayerAdded);

function system(world: World): void {
    for (const [_, player] of collectPlayersJoined()) {
        const playerEntity = makeEntity(world, true);

        setComponent(world, playerEntity, PlayerInstance, player, true);

        setComponent(world, playerEntity, Health, DEFAULT_HEALTH, true);
        setComponent(world, playerEntity, MaxHealth, DEFAULT_MAX_HEALTH, true);

        for (const { component, multiplier, value } of STATS) {
            setComponent(world, playerEntity, component, value, true);
            setPairValue(world, playerEntity, TokenMultiplier, component, multiplier, true);
        }
    }
}

export const playerJoinedSystem: SystemTable<[World]> = {
    runConditions: [hasPlayerJoined],
    system,
};
