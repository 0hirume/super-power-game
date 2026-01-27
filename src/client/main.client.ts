import jabby from "@rbxts/jabby";
import JabbyPlugin from "@rbxts/planck-jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import { ContextActionService } from "@rbxts/services";
import Net from "@rbxts/yetanothernet";

import { replicator } from "../shared/replicator/client";
import { routes } from "../shared/routes";
import * as _ from "../shared/tags";
import { world } from "../shared/world";

import { scheduler } from "./scheduler";
import { detectHumanoidJumped } from "./systems/humanoid-jumped";
import { onKeyInput, onMouseInput } from "./systems/process-inputs";
import {
    replecsReceiveFullSystem,
    replecsStartReplicationSystem,
    replecsReceiveUpdateSystem,
} from "./systems/replecs";

replicator.init(world);

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addPlugin(new JabbyPlugin())
    .addSystem(beginFrame)
    .addSystem(onKeyInput)
    .addSystem(onMouseInput)
    .addSystem(detectHumanoidJumped)
    .addSystem(replecsReceiveFullSystem)
    .addSystem(replecsReceiveUpdateSystem)
    .addSystem(replecsStartReplicationSystem)
    .addSystem(endFrame);

jabby.register({
    applet: jabby.applets.world,
    configuration: { world: world },
    name: "Client World",
});

const client = jabby.obtain_client();

ContextActionService.BindAction(
    "Open Jabby Home",
    (_, state) => {
        if (state === Enum.UserInputState.Begin) {
            client.spawn_app(client.apps.home);
        }
    },
    false,
    Enum.KeyCode.F4,
);
