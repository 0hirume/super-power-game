import { Name, type InferComponent, type Pair } from "@rbxts/jecs";
import type { Entity, World, Tag } from "@rbxts/jecs";
import jecs from "@rbxts/jecs";
import replecs from "@rbxts/replecs";

export function makeComponent<T>(world: World, name?: string, isShared = false): Entity<T> {
    const component = world.component<T>();

    if (name !== undefined) {
        world.set(component, Name, name);
    }

    if (isShared) {
        world.add(component, replecs.shared);
    }

    return component;
}

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

export function makeEntity(world: World, isNetworked = false): Entity {
    const entity = world.entity();

    if (isNetworked) {
        world.set(entity, replecs.networked, undefined);
    }

    return entity;
}

export function addTag(world: World, entity: Entity, tag: Tag, isReplicated = false): void {
    world.add(entity, tag);

    if (isReplicated) {
        world.set(entity, jecs.pair(replecs.reliable, tag), undefined);
    }
}

export function setComponent<T>(
    world: World,
    entity: Entity,
    component: Entity<T>,
    value: InferComponent<Entity<T>>,
    isReplicated = false,
): void {
    world.set(entity, component, value);

    if (isReplicated) {
        world.set(entity, jecs.pair(replecs.reliable, component), undefined);
    }
}

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
