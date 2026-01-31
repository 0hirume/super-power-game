import jabby from "@rbxts/jabby";
import JabbyPlugin from "@rbxts/planck-jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/server";
import { routes } from "../shared/routes";
import { world } from "../shared/world";

import { scheduler } from "./scheduler";
import { decreaseCooldowns } from "./systems/decrease-cooldowns";
import {
    cleanupPlayer,
    setupPlayer,
    trackAnimatorAdded,
    trackAnimatorRemoved,
    trackAnimatorUpdated,
    trackCharacterAdded,
    trackCharacterRemoved,
    trackCharacterUpdated,
    trackHumanoidAdded,
    trackHumanoidRemoved,
    trackHumanoidRootAdded,
    trackHumanoidRootRemoved,
    trackHumanoidRootUpdated,
    trackHumanoidUpdated,
} from "./systems/entities";
import { sendFull, sendUpdates } from "./systems/replecs";
import { reconcileHumanoids, regenerateHealth } from "./systems/stats";
import {
    addJumpTrainRequest,
    addPowerTrainRequest,
    addSpeedTrainRequest,
    addTrainRequest,
    applyTrainingModeEffects,
    destroyTrainingVisualEffect,
    spawnTrainingVisualEffect,
    removeTrainingModeEffects,
    updateTrainingMode,
    processTrainRequest,
} from "./systems/training";

replicator.init(world);

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addPlugin(new JabbyPlugin())
    .addSystem(beginFrame)
    .addSystem(setupPlayer)
    .addSystem(cleanupPlayer)
    .addSystem(trackCharacterAdded)
    .addSystem(trackCharacterUpdated)
    .addSystem(trackCharacterRemoved)
    .addSystem(trackHumanoidAdded)
    .addSystem(trackHumanoidUpdated)
    .addSystem(trackHumanoidRemoved)
    .addSystem(trackHumanoidRootAdded)
    .addSystem(trackHumanoidRootUpdated)
    .addSystem(trackHumanoidRootRemoved)
    .addSystem(trackAnimatorAdded)
    .addSystem(trackAnimatorUpdated)
    .addSystem(trackAnimatorRemoved)
    .addSystem(regenerateHealth)
    .addSystem(reconcileHumanoids)
    .addSystem(updateTrainingMode)
    .addSystem(applyTrainingModeEffects)
    .addSystem(removeTrainingModeEffects)
    .addSystem(spawnTrainingVisualEffect)
    .addSystem(destroyTrainingVisualEffect)
    .addSystem(addTrainRequest)
    .addSystem(addSpeedTrainRequest)
    .addSystem(addJumpTrainRequest)
    .addSystem(addPowerTrainRequest)
    .addSystem(processTrainRequest)
    .addSystem(decreaseCooldowns)
    .addSystem(sendFull)
    .addSystem(sendUpdates)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Server World",
});
