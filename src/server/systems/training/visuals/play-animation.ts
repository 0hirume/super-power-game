import type { CachedQuery, Entity, Tag, World } from "@rbxts/jecs";
import { pair } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { Player, Visual } from "../../../../shared/components";
import { STATUS_VISUAL_ANIMATIONS } from "../../../../shared/constants/components";
import { setPairValue } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const queries: Record<Tag, CachedQuery<[Entity<Animator>]>> = {};

    for (const [tag] of pairs(STATUS_VISUAL_ANIMATIONS)) {
        queries[tag] = world
            .query(Player.Animator)
            .with(tag)
            .without(pair(Visual.AnimationTrack, tag))
            .cached();
    }

    function system(): void {
        for (const [tag, animation] of pairs(STATUS_VISUAL_ANIMATIONS)) {
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
