import type { Entity } from "@rbxts/jecs";
import { Route } from "@rbxts/yetanothernet";

export const routes = {
    onHumanoidJumped: new Route<[]>(),

    receiveFull: new Route<[buffer, unknown[][]]>(),
    receiveUpdate: new Route<[buffer, unknown[][]]>(),

    requestReplication: new Route<[]>(),
    requestTrainingModeChange: new Route<[Entity<number>]>(),
    requestTrain: new Route<[]>(),
};
