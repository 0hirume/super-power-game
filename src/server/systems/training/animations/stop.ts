import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { AnimationTrackInstance } from "../../../../shared/components";
import {
    EnduranceTrainingEffect,
    PowerTrainingEffect,
    StrengthTrainingEffect,
} from "../../../../shared/tags";

const ANIMATIONS: Tag[] = [StrengthTrainingEffect, EnduranceTrainingEffect, PowerTrainingEffect];

function system(world: World): void {
    for (const tag of ANIMATIONS) {
        for (const [entity, track] of world.query(pair(AnimationTrackInstance, tag)).without(tag)) {
            world.remove(entity, pair(AnimationTrackInstance, tag));

            track.Stop();
            track.Destroy();
        }
    }
}

export const stopTrainingAnimation: SystemTable<[World]> = {
    name: "StopTrainingAnimation",
    system,
};
