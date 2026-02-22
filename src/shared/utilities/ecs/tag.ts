import type { Entity, World, Tag } from "@rbxts/jecs";

import { Name } from "@rbxts/jecs";
import jecs from "@rbxts/jecs";
import replecs from "@rbxts/replecs";

export function makeTag(world: World, name?: string, isShared = false): Tag {
    const tag = world.entity();

    if (name !== undefined) {
        world.set(tag, Name, name);
    }

    if (isShared) {
        world.add(tag, replecs.shared);
    }

    return tag;
}

export function addTag(world: World, entity: Entity, tag: Tag, isReplicated = false): void {
    world.add(entity, tag);

    if (isReplicated) {
        world.set(entity, jecs.pair(replecs.reliable, tag), undefined);
    }
}
