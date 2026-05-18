local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local jabby = require("@game/ReplicatedStorage/roblox_packages/jabby")
local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local world = require("@game/ReplicatedStorage/world")

local LOCAL_PLAYER = Players.LocalPlayer

local OPEN_JABBY_ACTION = ReplicatedStorage.assets.inputs.debug.openJabby

local systemTable: planck.SystemTable<jecs.World> = {
    name = "JabbySetupClient",
    runConditions = { planck.runOnce() },
    system = function()
        jabby.register({
            applet = jabby.applets.world,
            configuration = { world = world },
            name = "Client World",
        })

        local isInGroup = false

        task.spawn(function()
            isInGroup = LOCAL_PLAYER:IsInGroupAsync(985474832)
        end)

        jabby.set_check_function(function(player)
            return isInGroup
        end)

        local client = jabby.obtain_client()

        OPEN_JABBY_ACTION.Pressed:Connect(function()
            client.spawn_app(client.apps.home, nil)
        end)
    end,
}

return systemTable
