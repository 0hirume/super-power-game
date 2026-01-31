export function makeAnimation(id: string): Animation {
    const animation = new Instance("Animation");
    animation.AnimationId = id;

    return animation;
}
