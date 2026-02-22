import type { InferComponent, Pair } from "@rbxts/jecs";
import type { Entity, World, Tag } from "@rbxts/jecs";

import jecs from "@rbxts/jecs";
import replecs from "@rbxts/replecs";

export function addPair(
    world: World,
    entity: Entity,
    relation: Tag,
    target: Entity,
    isReplicated = false,
): void {
    world.add(entity, jecs.pair(relation, target));

    if (isReplicated) {
        world.set(entity, jecs.pair(replecs.pair, relation), undefined);
    }
}

export function setPairValue<R, T>(
    world: World,
    entity: Entity,
    relation: Entity<R>,
    target: Entity<T>,
    value: InferComponent<Pair<R, T>>,
    isReplicated = false,
): void {
    world.set(entity, jecs.pair(relation, target), value);

    if (isReplicated) {
        world.set(entity, jecs.pair(replecs.pair, relation), undefined);
    }
}
