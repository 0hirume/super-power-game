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
    trackTorsoAdded,
    trackTorsoRemoved,
    trackTorsoUpdated,
} from "./systems/player";
import { sendFull, sendUpdates } from "./systems/replecs";
import { reconcileHumanoids, regenerateHealth } from "./systems/stats";
import {
    addJumpTrainAction,
    addSpeedTrainAction,
    addTrainAction,
    applyTrainingModeEffects,
    destroyTrainingVisualEffect,
    playTrainingAnimation,
    spawnTrainingVisualEffect,
    removeTrainingModeEffects,
    stopTrainingAnimation,
    updateTrainingMode,
    processTrainAction,
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
    .addSystem(trackTorsoAdded)
    .addSystem(trackTorsoUpdated)
    .addSystem(trackTorsoRemoved)
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
    .addSystem(playTrainingAnimation)
    .addSystem(stopTrainingAnimation)
    .addSystem(addTrainAction)
    .addSystem(addSpeedTrainAction)
    .addSystem(addJumpTrainAction)
    .addSystem(processTrainAction)
    .addSystem(decreaseCooldowns)
    .addSystem(sendFull)
    .addSystem(sendUpdates)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Server World",
});
