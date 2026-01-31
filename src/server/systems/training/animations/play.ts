import type { Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import animations from "../../../../shared/animations";
import { AnimationTrackInstance, AnimatorInstance } from "../../../../shared/components";
import { PowerTrainingEffect } from "../../../../shared/tags";
import { makeAnimation } from "../../../../shared/utilities/animations";
import { setPairValue } from "../../../../shared/utilities/ecs";

const ANIMATIONS: Record<Tag, Animation> = {
    [PowerTrainingEffect]: makeAnimation(animations["meditation.rbxm"]),
};

function system(world: World): void {
    for (const [tag, animation] of pairs(ANIMATIONS)) {
        for (const [entity, animator] of world
            .query(AnimatorInstance)
            .with(tag)
            .without(pair(AnimationTrackInstance, tag))) {
            const track = animator.LoadAnimation(animation);
            track.Play();

            setPairValue(world, entity, AnimationTrackInstance, tag, track);
        }
    }
}

export const playTrainingAnimation: SystemTable<[World]> = {
    name: "PlayTrainingAnimation",
    system,
};
