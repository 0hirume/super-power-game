import type { Entity } from "@rbxts/jecs";

import { Route } from "@rbxts/yetanothernet";

export const routes = {
    onHumanoidJumped: new Route<[]>(),

    receiveFull: new Route<[buffer, defined[][]?]>(),
    receiveUpdate: new Route<[buffer, defined[][]?]>(),

    requestReplication: new Route<[]>(),
    requestTrain: new Route<[]>(),
    requestTrainingModeChange: new Route<[Entity<number>]>(),
};
