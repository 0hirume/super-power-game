local ReplicatedStorage = game:GetService("ReplicatedStorage")

local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../blink")

local SET_TRAINING_MODE_STRENGTH = ReplicatedStorage.assets.inputs.training.setTrainingModeStrength
local SET_TRAINING_MODE_ENDURANCE = ReplicatedStorage.assets.inputs.training.setTrainingModeEndurance
local SET_TRAINING_MODE_POWER = ReplicatedStorage.assets.inputs.training.setTrainingModePower

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ProcessInputActions",
    runConditions = { planck.runOnce() },
    system = function()
        SET_TRAINING_MODE_STRENGTH.Pressed:Connect(function()
            blink.setTrainingMode.fire("Strength")
        end)

        SET_TRAINING_MODE_ENDURANCE.Pressed:Connect(function()
            blink.setTrainingMode.fire("Endurance")
        end)

        SET_TRAINING_MODE_POWER.Pressed:Connect(function()
            blink.setTrainingMode.fire("Power")
        end)
    end,
}

return systemTable
