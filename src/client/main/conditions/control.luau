local isDisabled = false

return {
    isDisabled = function()
        return isDisabled
    end,
    disable = function()
        isDisabled = true
    end,
}
