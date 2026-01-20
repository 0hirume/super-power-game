import { Name, type Entity, type World } from "@rbxts/jecs";
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
