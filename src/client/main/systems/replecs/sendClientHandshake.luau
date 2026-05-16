local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replication = require("../../conditions/replication")
local replicator = require("../../replicator")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsSendClientHandshake",
    runConditions = { planck.isNot(replication.handshake.isVerified) },
    system = function()
        blink.sendClientHandshake.fire(replicator:generate_handshake())
    end,
}

return systemTable
