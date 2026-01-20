import jabby from "@rbxts/jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/server";
import { routes } from "../shared/routes";
import { scheduler } from "../shared/scheduler";
import { world } from "../shared/world";

import { decreaseCoolDownSystem } from "./systems/decrease-cooldown";
import { playerJoinedSystem } from "./systems/player-join";
import { playerLeftSystem } from "./systems/player-left";
import { replecsHydrateSystem, replecsStartSystem } from "./systems/replecs";
import { trainSystem } from "./systems/train";

replicator.init(world);

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addSystem(beginFrame)
    .addSystem(replecsStartSystem)
    .addSystem(replecsHydrateSystem)
    .addSystem(playerJoinedSystem)
    .addSystem(playerLeftSystem)
    .addSystem(trainSystem)
    .addSystem(decreaseCoolDownSystem)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Server World",
});
