import type { World } from "@rbxts/jecs";
import type { SystemTable } from "@rbxts/planck";

import { pair } from "@rbxts/jecs";
import Object from "@rbxts/object-utils";

import { Player, Visual } from "../../../../shared/components";
import { STATUS_VISUAL_ANIMATIONS } from "../../../../shared/constants/components";
import { setPairValue } from "../../../../shared/utilities/ecs";

function initializer(world: World): { system: () => void } {
    const entries = Object.entries(STATUS_VISUAL_ANIMATIONS).map(([tag, animation]) => ({
        animation,
        query: world
            .query(Player.Animator)
            .with(tag)
            .without(pair(Visual.AnimationTrack, tag))
            .cached(),
        tag,
    }));

    function system(): void {
        for (const { animation, query, tag } of entries) {
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
