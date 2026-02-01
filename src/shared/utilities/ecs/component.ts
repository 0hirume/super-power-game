import { Name, type InferComponent } from "@rbxts/jecs";
import type { Entity, World } from "@rbxts/jecs";
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
