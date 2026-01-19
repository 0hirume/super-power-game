import jabby from "@rbxts/jabby";
import { Plugin as RunServicePlugin } from "@rbxts/planck-runservice";
import { ContextActionService } from "@rbxts/services";
import Net from "@rbxts/yetanothernet";

import { routes } from "../shared/routes";
import { scheduler } from "../shared/scheduler";

import { processInputsSystem } from "./systems/process-inputs";

const [beginFrame, endFrame] = Net.createHook(routes);

scheduler
    .addPlugin(new RunServicePlugin())
    .addSystem(beginFrame)
    .addSystem(processInputsSystem)
    .addSystem(endFrame);

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
