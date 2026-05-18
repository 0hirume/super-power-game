local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "StopTrainingAnimation",
    system = function(world: jecs.World)
        local entries: { [jecs.Component<number>]: jecs.Cached_Query<AnimationTrack> } = {}

        for _, attribute in { value.Strength, value.Endurance, value.Power } do
            entries[attribute] = world:query(jecs.pair(instance.AnimationTrack, attribute)):without(jecs.pair(state.TrainingMode, attribute)):cached()
        end

        return {
            system = function()
                for attribute, query in entries do
                    for entity, track in query do
                        world:remove(entity, jecs.pair(instance.AnimationTrack, attribute))

                        track:Stop()
                        track:Destroy()
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
