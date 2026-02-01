import type { CachedQuery, Entity, Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import animations from "../../../../shared/animations";
import { Player, Status, Visual } from "../../../../shared/components";
import { makeAnimation } from "../../../../shared/utilities/animations";
import { setPairValue } from "../../../../shared/utilities/ecs";

const ANIMATIONS: Record<Tag, Animation> = {
    [Status.PowerTraining]: makeAnimation(animations["meditation.rbxm"]),
};

function initializer(world: World): { system: () => void } {
    const queries: Record<Tag, CachedQuery<[Entity<Animator>]>> = {};

    for (const [tag] of pairs(ANIMATIONS)) {
        queries[tag] = world
            .query(Player.Animator)
            .with(tag)
            .without(pair(Visual.AnimationTrack, tag))
            .cached();
    }

    function system(): void {
        for (const [tag, animation] of pairs(ANIMATIONS)) {
            const query = queries[tag];

            if (query === undefined) {
                continue;
            }

            for (const [entity, animator] of query) {
                const track = animator.LoadAnimation(animation);
                track.Play();

                setPairValue(world, entity, Visual.AnimationTrack, tag, track);
            }
        }
    }

    return { system };
}

export const playTrainingAnimation: SystemTable<[World]> = {
    name: "PlayTrainingAnimation",
    system: initializer,
};
