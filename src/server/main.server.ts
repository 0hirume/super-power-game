import jabby from "@rbxts/jabby";
import JabbyPlugin from "@rbxts/planck-jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/server";
import { routes } from "../shared/routes";
import { world } from "../shared/world";

import { scheduler } from "./scheduler";
import {
    detectCharacterAdded,
    detectCharacterRemoved,
    detectCharacterUpdated,
} from "./systems/character";
import { decreaseCooldowns } from "./systems/decrease-cooldowns";
import {
    detectHumanoidAdded,
    detectHumanoidRemoved,
    detectHumanoidUpdated,
    regenerateHealth,
    reconcileHumanoidStats,
} from "./systems/humanoid";
import {
    detectHumanoidRootAdded,
    detectHumanoidRootRemoved,
    detectHumanoidRootUpdated,
} from "./systems/humanoid-root";
import { onPlayerJoined, onPlayerLeft } from "./systems/player";
import { onRequestReplication, sendUpdates } from "./systems/replecs";
import {
    addJumpTrainRequest,
    addSpeedTrainRequest,
    addTrainRequest,
    addPowerTrainRequest,
    handleSetTrainingMode,
} from "./systems/requests";
import {
    processEnduranceTraining,
    processJumpForceTraining,
    processPowerTraining,
    processSpeedTraining,
    processStrengthTraining,
} from "./systems/training";

replicator.init(world);

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addPlugin(new JabbyPlugin())
    .addSystem(beginFrame)
    .addSystem(onPlayerJoined)
    .addSystem(onPlayerLeft)
    .addSystem(detectCharacterAdded)
    .addSystem(detectCharacterUpdated)
    .addSystem(detectCharacterRemoved)
    .addSystem(detectHumanoidAdded)
    .addSystem(detectHumanoidUpdated)
    .addSystem(detectHumanoidRemoved)
    .addSystem(detectHumanoidRootAdded)
    .addSystem(detectHumanoidRootUpdated)
    .addSystem(detectHumanoidRootRemoved)
    .addSystem(regenerateHealth)
    .addSystem(reconcileHumanoidStats)
    .addSystem(handleSetTrainingMode)
    .addSystem(addTrainRequest)
    .addSystem(addSpeedTrainRequest)
    .addSystem(addJumpTrainRequest)
    .addSystem(addPowerTrainRequest)
    .addSystem(processStrengthTraining)
    .addSystem(processEnduranceTraining)
    .addSystem(processSpeedTraining)
    .addSystem(processJumpForceTraining)
    .addSystem(processPowerTraining)
    .addSystem(decreaseCooldowns)
    .addSystem(onRequestReplication)
    .addSystem(sendUpdates)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Server World",
});
