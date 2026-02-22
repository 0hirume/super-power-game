import type { Entity, World } from "@rbxts/jecs";

import replecs from "@rbxts/replecs";

export function makeEntity(world: World, isNetworked = false): Entity {
    const entity = world.entity();

    if (isNetworked) {
        world.set(entity, replecs.networked, undefined);
    }

    return entity;
}
