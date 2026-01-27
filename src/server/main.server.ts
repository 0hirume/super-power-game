import jabby from "@rbxts/jabby";
import JabbyPlugin from "@rbxts/planck-jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/server";
import { routes } from "../shared/routes";
import { world } from "../shared/world";

import { scheduler } from "./scheduler";
import { characterAddedSystem, characterChangedSystem } from "./systems/character";
import { decreaseCooldownSystem } from "./systems/decrease-cooldown";
import {
    addJumpTrainEventSystem,
    addSpeedTrainEventSystem,
    addTrainEventSystem,
    addPowerTrainEventSystem,
    setTrainingModeSystem,
} from "./systems/events";
import {
    humanoidAddedSystem,
    humanoidChangedSystem,
    passiveHealSystem,
    syncHumanoidSystem,
} from "./systems/humanoid";
import { humanoidRootAddedSystem, humanoidRootChangedSystem } from "./systems/humanoid-root";
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
    .addPlugin(new JabbyPlugin())
    .addSystem(beginFrame)
    .addSystem(playerJoinedSystem)
    .addSystem(playerLeftSystem)
    .addSystem(characterAddedSystem)
    .addSystem(characterChangedSystem)
    .addSystem(humanoidAddedSystem)
    .addSystem(humanoidChangedSystem)
    .addSystem(humanoidRootAddedSystem)
    .addSystem(humanoidRootChangedSystem)
    .addSystem(passiveHealSystem)
    .addSystem(syncHumanoidSystem)
    .addSystem(setTrainingModeSystem)
    .addSystem(addTrainEventSystem)
    .addSystem(addSpeedTrainEventSystem)
    .addSystem(addJumpTrainEventSystem)
    .addSystem(addPowerTrainEventSystem)
    .addSystem(trainStrengthSystem)
    .addSystem(trainEnduranceSystem)
    .addSystem(trainSpeedSystem)
    .addSystem(trainJumpSystem)
    .addSystem(trainPowerSystem)
    .addSystem(decreaseCooldownSystem)
    .addSystem(replecsStartSystem)
    .addSystem(replecsHydrateSystem)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Server World",
});
