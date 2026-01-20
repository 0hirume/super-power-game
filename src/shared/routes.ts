import { Route } from "@rbxts/yetanothernet";

export const routes = {
    receiveFull: new Route<[buffer, unknown[][]]>(),
    receiveUpdate: new Route<[buffer, unknown[][]]>(),
    startReplication: new Route(),

    trainEndurance: new Route(),
    trainPower: new Route(),
    trainStrength: new Route(),
};
