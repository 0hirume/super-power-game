local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ProcessTrainingMode",
    runConditions = { planck.timePassed(1) },
    system = function(world: jecs.World)
        local entries: { { attribute: jecs.Component<number>, query: jecs.Cached_Query<number, number> } } = {}

        for _, attribute in { value.Strength, value.Endurance, value.Power } do
            table.insert(entries, {
                attribute = attribute,
                query = world
                    :query(attribute, jecs.pair(value.TokenMultiplier, attribute))
                    :with(jecs.pair(state.TrainingMode, attribute))
                    :without(jecs.pair(value.Cooldown, state.TrainingMode))
                    :cached(),
            })
        end

        return {
            system = function()
                for _, entry in entries do
                    for entity, attributeValue, multiplier in entry.query do
                        world:set(entity, entry.attribute, attributeValue + multiplier)
                        world:set(entity, jecs.pair(value.Cooldown, state.TrainingMode), 1)
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
