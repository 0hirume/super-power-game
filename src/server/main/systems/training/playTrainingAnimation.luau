local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local makeAnimation = require("@game/ReplicatedStorage/utilities/makeAnimation")

local animations = require("@game/ReplicatedStorage/animations")

local ANIMATIONS = {
    [value.Strength] = makeAnimation(animations["punch.rbxm"]),
    [value.Endurance] = makeAnimation(animations["pushup.rbxm"]),
    [value.Power] = makeAnimation(animations["meditation.rbxm"]),
}

local systemTable: planck.SystemTable<jecs.World> = {
    name = "PlayTrainingAnimation",
    system = function(world: jecs.World)
        local entries: { [jecs.Component<number>]: jecs.Cached_Query<Animator> } = {}

        for _, attribute in { value.Strength, value.Endurance, value.Power } do
            entries[attribute] =
                world:query(instance.Animator):with(jecs.pair(state.TrainingMode, attribute)):without(jecs.pair(instance.AnimationTrack, attribute)):cached()
        end

        return {
            system = function()
                for attribute, query in entries do
                    for entity, animator in query do
                        local track = animator:LoadAnimation(ANIMATIONS[attribute])
                        track:Play()

                        world:set(entity, jecs.pair(instance.AnimationTrack, attribute), track)
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
