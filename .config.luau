type LanguageMode = "strict" | "nonstrict" | "nocheck"

type LintWarning =
    "*"
    | "UnknownGlobal"
    | "DeprecatedGlobal"
    | "GlobalUsedAsLocal"
    | "LocalShadow"
    | "SameLineStatement"
    | "MultiLineStatement"
    | "LocalUnused"
    | "FunctionUnused"
    | "ImportUnused"
    | "BuiltinGlobalWrite"
    | "PlaceholderRead"
    | "UnreachableCode"
    | "UnknownType"
    | "ForRange"
    | "UnbalancedAssignment"
    | "ImplicitReturn"
    | "DuplicateLocal"
    | "FormatString"
    | "TableLiteral"
    | "UninitializedLocal"
    | "DuplicateFunction"
    | "DeprecatedApi"
    | "TableOperations"
    | "DuplicateCondition"
    | "MisleadingAndOr"
    | "CommentDirective"
    | "IntegerParsing"
    | "ComparisonPrecedence"
    | "RedundantNativeAttribute"

type LuauConfig = {
    languagemode: LanguageMode?,
    lint: { [LintWarning]: boolean }?,
    linterrors: boolean?,
    typeerrors: boolean?,
    globals: { string }?,
    aliases: { [string]: string }?,
}

type Config = {
    luau: LuauConfig?,
}

local config: Config = {
    luau = {
        languagemode = "strict",
    },
}

return config
