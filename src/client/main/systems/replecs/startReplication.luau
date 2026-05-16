local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replication = require("../../conditions/replication")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsStartReplication",
    runConditions = { replication.handshake.isVerified, planck.isNot(replication.isStarted) },
    system = function()
        blink.requestReplication.fire()
    end,
}

return systemTable
