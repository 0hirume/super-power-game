import jabby from "@rbxts/jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import Net from "@rbxts/yetanothernet";

import { routes } from "../shared/routes";
import { scheduler } from "../shared/scheduler";
import { sharedWorld } from "../shared/world";

import { decreaseCoolDownSystem } from "./systems/decrease-cooldown";
import { playerJoinedSystem } from "./systems/player-join";
import { playerLeftSystem } from "./systems/player-left";
import { trainSystem } from "./systems/train";

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addSystem(beginFrame)
    .addSystem(playerJoinedSystem)
    .addSystem(playerLeftSystem)
    .addSystem(trainSystem)
    .addSystem(decreaseCoolDownSystem)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: sharedWorld },
    name: "Jecs World",
});
