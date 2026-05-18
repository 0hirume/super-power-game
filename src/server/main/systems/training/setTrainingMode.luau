local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local state = require("@game/ReplicatedStorage/components/state")
local value = require("@game/ReplicatedStorage/components/value")

local blink = require("../../blink")
local playerEntities = require("../../playerEntities")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "SetTrainingMode",
    system = function(world: jecs.World)
        for _, player, mode in blink.setTrainingMode.iter() do
            local entity = playerEntities[player]

            if entity == nil then
                continue
            end

            local currentMode = world:target(entity, state.TrainingMode)

            if currentMode ~= nil then
                world:remove(entity, jecs.pair(state.TrainingMode, currentMode))
                world:remove(entity, jecs.pair(state.MovementDisabled, state.TrainingMode))
                world:remove(entity, jecs.pair(state.NoCollide, state.TrainingMode))
            end

            if mode == "Strength" and (currentMode ~= value.Strength) then
                world:add(entity, jecs.pair(state.TrainingMode, value.Strength))
                world:add(entity, jecs.pair(state.MovementDisabled, state.TrainingMode))
            end

            if mode == "Endurance" and (currentMode ~= value.Endurance) then
                world:add(entity, jecs.pair(state.TrainingMode, value.Endurance))
                world:add(entity, jecs.pair(state.MovementDisabled, state.TrainingMode))
                world:add(entity, jecs.pair(state.NoCollide, state.TrainingMode))
            end

            if mode == "Power" and (currentMode ~= value.Power) then
                world:add(entity, jecs.pair(state.TrainingMode, value.Power))
                world:add(entity, jecs.pair(state.MovementDisabled, state.TrainingMode))
            end

            break
        end
    end,
}

return systemTable
