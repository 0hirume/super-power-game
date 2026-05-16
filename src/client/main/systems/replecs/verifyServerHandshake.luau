local jecs = require("@game/ReplicatedStorage/roblox_packages/jecs")
local planck = require("@game/ReplicatedStorage/roblox_packages/planck")

local blink = require("../../blink")
local replication = require("../../conditions/replication")
local replicator = require("../../replicator")

local systemTable: planck.SystemTable<jecs.World> = {
    name = "ReplecsVerifyServerHandshake",
    runConditions = { planck.isNot(replication.handshake.isVerified) },
    system = function()
        for _, handshake in blink.sendServerHandshake.iter() do
            local success, errorMessage = replicator:verify_handshake(handshake)

            if success then
                replication.handshake.verify()
            else
                warn(`Server handshake mismatch: {errorMessage}`)
            end
        end
    end,
}

return systemTable
