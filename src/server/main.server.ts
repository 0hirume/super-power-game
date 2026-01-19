import jabby from "@rbxts/jabby";
import { sharedWorld } from "../shared/world";
import { scheduler } from "../shared/scheduler";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import { playerJoinedSystem } from "./systems/player-join";
import { playerLeftSystem } from "./systems/player-left";
import Net from "@rbxts/yetanothernet";
import { routes } from "../shared/routes";
import { trainSystem } from "./systems/train";
import { decreaseCoolDownSystem } from "./systems/decrease-cooldown";

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
