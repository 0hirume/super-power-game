local jecs = require("../../roblox_packages/jecs")
local replecs = require("../../roblox_packages/replecs")

type Entity<T = nil> = jecs.Entity<T>
type World = jecs.World

return function(world: World, name: string?, isShared: boolean?): Entity
    local tag = world:entity()

    if name ~= nil then
        world:set(tag, jecs.Name, name)
    end

    if isShared then
        world:add(tag, replecs.shared)
    end

    return tag
end
