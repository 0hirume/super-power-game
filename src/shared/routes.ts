import type { Entity } from "@rbxts/jecs";
import { Route } from "@rbxts/yetanothernet";

export const routes = {
    humanoidJumped: new Route<[]>(),

    receiveFull: new Route<[buffer, unknown[][]]>(),
    receiveUpdate: new Route<[buffer, unknown[][]]>(),

    setTrainingMode: new Route<[Entity<number>]>(),

    startReplication: new Route<[]>(),

    train: new Route<[]>(),
};
