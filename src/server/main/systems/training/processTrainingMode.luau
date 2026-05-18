local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ProcessTrainingMode",
    runConditions = { planck.timePassed(1) },
    system = function(world: jecs.World)
        local entries: { [jecs.Component<number>]: jecs.Cached_Query<Humanoid, number, number> } = {}

        for _, attribute in { value.Strength, value.Endurance, value.Power } do
            entries[attribute] = world
                :query(instance.Humanoid, attribute, jecs.pair(value.TokenMultiplier, attribute))
                :with(jecs.pair(state.TrainingMode, attribute))
                :without(jecs.pair(value.Cooldown, attribute))
                :cached()
        end

        return {
            system = function()
                for attribute, query in entries do
                    for entity, humanoid, attributeValue, multiplier in query do
                        if humanoid:GetState() == Enum.HumanoidStateType.Dead then
                            continue
                        end

                        world:set(entity, attribute, attributeValue + multiplier)
                        world:set(entity, jecs.pair(value.Cooldown, attribute), 1)
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
