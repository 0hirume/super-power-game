local ReplicatedStorage = game:GetService("ReplicatedStorage")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local instance = require("@game/ReplicatedStorage/components/instance")
local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local MODELS = {
    [value.Endurance] = ReplicatedStorage.assets.effects.pushup,
    [value.Power] = ReplicatedStorage.assets.effects.meditation,
}

local systemTable: planck.SystemTable<jecs.World> = {
    name = "SpawnTrainingVisualEffects",
    system = function(world: jecs.World)
        local entries: { [jecs.Component<number>]: jecs.Cached_Query<Model, Part> } = {}

        for _, attribute in { value.Endurance, value.Power } do
            entries[attribute] = world
                :query(instance.Character, instance.Torso)
                :with(jecs.pair(state.TrainingMode, attribute))
                :without(jecs.pair(instance.VisualEffect, attribute))
                :cached()
        end

        return {
            system = function()
                for attribute, query in entries do
                    for entity, character, torso in query do
                        local model = MODELS[attribute]

                        local newModel = model:Clone()
                        newModel.Name = `{world:get(attribute, jecs.Name) or "Unknown"}TrainingVisualEffect`
                        newModel.Parent = character

                        newModel:PivotTo(torso.CFrame)

                        local weld = Instance.new("WeldConstraint")
                        weld.Part0 = newModel.PrimaryPart :: BasePart
                        weld.Part1 = torso
                        weld.Parent = newModel.PrimaryPart

                        world:set(entity, jecs.pair(instance.VisualEffect, attribute), newModel)
                    end
                end
            end,
        }
    end :: planck.InitializerSystemFn<jecs.World>,
    -- FIXME: remove this ascription when fixed
}

return systemTable
