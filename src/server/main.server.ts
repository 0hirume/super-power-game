import jabby from "@rbxts/jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/server";
import { routes } from "../shared/routes";
import { world } from "../shared/world";

import { scheduler } from "./scheduler";
import { decreaseCoolDownSystem } from "./systems/decrease-cooldown";
import {
    addJumpTrainEventSystem,
    addSpeedTrainEventSystem,
    addTrainEventSystem,
    addPowerTrainEventSystem,
} from "./systems/events";
import { passiveHealSystem, syncHealthSystem } from "./systems/health";
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
    .addSystem(passiveHealSystem)
    .addSystem(syncHealthSystem)
    .addSystem(addTrainEventSystem)
    .addSystem(addSpeedTrainEventSystem)
    .addSystem(addJumpTrainEventSystem)
    .addSystem(addPowerTrainEventSystem)
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
