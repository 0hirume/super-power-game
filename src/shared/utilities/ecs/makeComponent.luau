local jecs = require("../../roblox_packages/jecs")
local replecs = require("../../roblox_packages/replecs")

type Component<T = nil> = jecs.Component<T>
type Entity<T = nil> = jecs.Entity<T>
type World = jecs.World

return function<T>(world: World, name: string?, isShared: boolean?): Component<T>
    local component = world:component<<T>>()

    if name ~= nil then
        world:set(component, jecs.Name, name)
    end

    if isShared then
        world:add(component, replecs.shared)
    end

    return component
end
