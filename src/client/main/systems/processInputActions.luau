local ReplicatedStorage = game:GetService("ReplicatedStorage")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../blink")

local TRAINING_CONTEXT = ReplicatedStorage.assets.inputs.training

local SET_TRAINING_MODE_STRENGTH_ACTION = TRAINING_CONTEXT.setTrainingModeStrength
local SET_TRAINING_MODE_ENDURANCE_ACTION = TRAINING_CONTEXT.setTrainingModeEndurance
local SET_TRAINING_MODE_POWER_ACTION = TRAINING_CONTEXT.setTrainingModePower

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ProcessInputActions",
    runConditions = { planck.runOnce() },
    system = function()
        SET_TRAINING_MODE_STRENGTH_ACTION.Pressed:Connect(function()
            blink.setTrainingMode.fire("Strength")
        end)

        SET_TRAINING_MODE_ENDURANCE_ACTION.Pressed:Connect(function()
            blink.setTrainingMode.fire("Endurance")
        end)

        SET_TRAINING_MODE_POWER_ACTION.Pressed:Connect(function()
            blink.setTrainingMode.fire("Power")
        end)
    end,
}

return systemTable
