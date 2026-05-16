local ContextActionService = game:GetService("ContextActionService")

local jabby = require("@game/ReplicatedStorage/roblox_packages/jabby")
local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local world = require("@game/ReplicatedStorage/world")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "JabbySetupClient",
    runConditions = { planck.runOnce() },
    system = function()
        jabby.register({
            applet = jabby.applets.world,
            configuration = { world = world },
            name = "Client World",
        })

        local client = jabby.obtain_client()

        ContextActionService:BindAction("Open Jabby Home", function(_, state)
            if state == Enum.UserInputState.Begin then
                client.spawn_app(client.apps.home, nil)
            end
        end, false, Enum.KeyCode.F4)
    end,
}

return systemTable
