import type { SystemTable } from "@rbxts/planck";

import { pair, type World } from "@rbxts/jecs";

import { Action, Multiplier, Value } from "../../../../shared/components";
import { STAT_COMPONENTS } from "../../../../shared/constants/components";
import { setComponent, setPairValue } from "../../../../shared/utilities/ecs";

const COOLDOWN = 1;

function initializer(world: World): { system: () => void } {
    const entries = STAT_COMPONENTS.map((component) => ({
        component,
        query: world
            .query(component, pair(Multiplier.Token, component))
            .with(pair(Action.Train, component))
            .without(Value.Cooldown, component)
            .cached(),
    }));

    function system(): void {
        for (const { component, query } of entries) {
            for (const [entity, value, multiplier] of query) {
                world.remove(entity, pair(Action.Train, component));

                setComponent(world, entity, component, value + multiplier);
                setPairValue(world, entity, Value.Cooldown, component, COOLDOWN);
            }
        }
    }

    return { system };
}

export const processTrainAction: SystemTable<[World]> = {
    name: "ProcessTrainAction",
    system: initializer,
};
