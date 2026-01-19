import { Scheduler } from "@rbxts/planck";

import { sharedWorld } from "./world";

export const scheduler = new Scheduler(sharedWorld);
