import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";
import { onEvent } from "@rbxts/planck";
import { Players } from "@rbxts/services";

import { Multiplier, Player, Value } from "../../../../shared/components";
import { BASE } from "../../../../shared/constants/player";
import { makeEntity, setComponent, setPairValue } from "../../../../shared/utilities/ecs";

const STATS = [Value.Strength, Value.Endurance, Value.Speed, Value.JumpForce, Value.Power] as const;

const [hasPlayerJoined, collectPlayersJoined] = onEvent(Players.PlayerAdded);

function system(world: World): void {
    for (const [_, player] of collectPlayersJoined()) {
        const entity = makeEntity(world, true);
        setComponent(world, entity, Player.Instance, player, true);
        setComponent(world, entity, Value.Health, BASE.HEALTH, true);

        for (const component of STATS) {
            setComponent(world, entity, component, BASE.VALUE, true);
            setPairValue(world, entity, Multiplier.Token, component, BASE.MULTIPLIER, true);
        }
    }
}

export const setupPlayer: SystemTable<[World]> = {
    name: "SetupPlayer",
    runConditions: [hasPlayerJoined],
    system,
};
