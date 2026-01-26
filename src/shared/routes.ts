import { Route } from "@rbxts/yetanothernet";

export const routes = {
    humanoidJumped: new Route<[]>(),

    receiveFull: new Route<[buffer, unknown[][]]>(),
    receiveUpdate: new Route<[buffer, unknown[][]]>(),

    startReplication: new Route<[]>(),

    train: new Route<[]>(),
};
