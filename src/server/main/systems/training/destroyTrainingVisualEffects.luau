local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "DestroyTrainingVisualEffects",
    system = function(world: jecs.World)
        local entries: { [jecs.Component<number>]: jecs.Cached_Query<Model> } = {}

        for _, attribute in { value.Endurance, value.Power } do
            entries[attribute] = world:query(jecs.pair(instance.VisualEffect, attribute)):without(jecs.pair(state.TrainingMode, attribute)):cached()
        end

        return {
            system = function()
                for attribute, query in entries do
                    for entity, model in query do
                        world:remove(entity, jecs.pair(instance.VisualEffect, attribute))
                        model:Destroy()
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
