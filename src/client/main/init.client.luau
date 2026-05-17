local planck_jabby = require("@game/ReplicatedStorage/roblox_packages/planck-jabby")
local planck_runservice = require("@game/ReplicatedStorage/roblox_packages/planck-runservice")

local scheduler = require("@game/ReplicatedStorage/scheduler")
local world = require("@game/ReplicatedStorage/world")

local applyFull = require("@self/systems/replecs/applyFull")
local applyUpdates = require("@self/systems/replecs/applyUpdates")
local jabbySetupClient = require("@self/systems/jabbySetupClient")
local processInputActions = require("@self/systems/processInputActions")
local sendClientHandshake = require("@self/systems/replecs/sendClientHandshake")
local startReplication = require("@self/systems/replecs/startReplication")
local trackJump = require("@self/systems/trackJump")
local verifyServerHandshake = require("@self/systems/replecs/verifyServerHandshake")

local replicator = require("@self/replicator")

require("@game/ReplicatedStorage/components/instance")
require("@game/ReplicatedStorage/components/intent")
require("@game/ReplicatedStorage/components/state")
require("@game/ReplicatedStorage/components/value")

replicator:init(world)

scheduler
    :addPlugin(planck_jabby.new())
    :addPlugin(planck_runservice.Plugin.new())
    :addSystem(sendClientHandshake)
    :addSystem(verifyServerHandshake)
    :addSystem(startReplication)
    :addSystem(applyFull)
    :addSystem(applyUpdates)
    :addSystem(jabbySetupClient)
    :addSystem(processInputActions)
    :addSystem(trackJump)
