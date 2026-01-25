import jabby from "@rbxts/jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/server";
import { routes } from "../shared/routes";
import { world } from "../shared/world";

import { scheduler } from "./scheduler";
import { decreaseCoolDownSystem } from "./systems/decrease-cooldown";
import { playerJoinedSystem } from "./systems/player-join";
import { playerLeftSystem } from "./systems/player-left";
import { replecsHydrateSystem, replecsStartSystem } from "./systems/replecs";
import {
    trainEnduranceSystem,
    trainJumpSystem,
    trainPowerSystem,
    trainSpeedSystem,
    trainStrengthSystem,
} from "./systems/training";

replicator.init(world);

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addSystem(beginFrame)
    .addSystem(playerJoinedSystem)
    .addSystem(playerLeftSystem)
    .addSystem(trainStrengthSystem)
    .addSystem(trainEnduranceSystem)
    .addSystem(trainSpeedSystem)
    .addSystem(trainJumpSystem)
    .addSystem(trainPowerSystem)
    .addSystem(decreaseCoolDownSystem)
    .addSystem(replecsStartSystem)
    .addSystem(replecsHydrateSystem)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Server World",
});
