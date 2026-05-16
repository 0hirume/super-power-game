local planck_jabby = require("@game/ReplicatedStorage/roblox_packages/planck-jabby")
local planck_runservice = require("@game/ReplicatedStorage/roblox_packages/planck-runservice")

local scheduler = require("@game/ReplicatedStorage/scheduler")
local world = require("@game/ReplicatedStorage/world")

local applyHumanoidAttributes = require("@self/systems/applyHumanoidAttributes")
local decreaseCooldowns = require("@self/systems/decreaseCooldowns")
local jabbySetupServer = require("@self/systems/jabbySetupServer")
local processTrainingMode = require("@self/systems/training/processTrainingMode")
local receiveRequests = require("@self/systems/replecs/receiveRequests")
local sendUpdates = require("@self/systems/replecs/sendUpdates")
local setTrainingMode = require("@self/systems/training/setTrainingMode")
local setupPlayer = require("@self/systems/setupPlayer")

local replicator = require("@self/replicator")

require("@game/ReplicatedStorage/components/instance")
require("@game/ReplicatedStorage/components/intent")
require("@game/ReplicatedStorage/components/state")
require("@game/ReplicatedStorage/components/value")

replicator:init(world)

scheduler
    :addPlugin(planck_jabby.new())
    :addPlugin(planck_runservice.Plugin.new())
    :addSystem(receiveRequests)
    :addSystem(sendUpdates)
    :addSystem(jabbySetupServer)
    :addSystem(setupPlayer)
    :addSystem(applyHumanoidAttributes)
    :addSystem(setTrainingMode)
    :addSystem(processTrainingMode)
    :addSystem(decreaseCooldowns)
