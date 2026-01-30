import Services from "@rbxts/services";

type Refine<A, B> = A extends B ? A : B extends A ? B : B & A;
type StringKeyOf<T> = Extract<keyof T, string>;
type GetInstanceType<Key, Fallback> = Key extends keyof Instances ? Instances[Key] : Fallback;

type ResolveBaseType<Node, Fallback> = Node extends { $className: keyof Instances }
    ? Refine<GetInstanceType<Node["$className"], Fallback>, Fallback>
    : Fallback;

type GetChildKeys<Node, BaseType> = Exclude<
    StringKeyOf<Node>,
    "$className" | StringKeyOf<BaseType>
>;

type GetChildren<Node, BaseType> = {
    [Key in GetChildKeys<Node, BaseType>]: EvaluateInstanceTree<Node[Key]>;
};

export type EvaluateInstanceTree<Node, Fallback = Instance> =
    ResolveBaseType<Node, Fallback> extends infer BaseType
        ? Refine<BaseType, Fallback> & GetChildren<Node, Refine<BaseType, Fallback>>
        : never;

export interface InstanceTreeNode {
    $className?: StringKeyOf<Instances>;
    [key: string]: InstanceTreeNode | StringKeyOf<Instances> | undefined;
}

const CLASS_NAME = "$className";

function isValidServiceName(value: unknown): value is keyof typeof Services {
    return typeIs(value, "string") && value in Services;
}

function isValidService(node: InstanceTreeNode): boolean {
    for (const [key, childNode] of pairs(node)) {
        if (key === CLASS_NAME) {
            continue;
        }

        if (!isValidServiceName(key)) {
            return false;
        }

        if (!(typeIs(childNode, "string") || isValidTree(Services[key], childNode))) {
            return false;
        }
    }

    return true;
}

function isValidInstance(instance: Instance, node: InstanceTreeNode): boolean {
    const validKeys = new Set([CLASS_NAME]);

    for (const child of instance.GetChildren()) {
        const name = child.Name;
        const childNode = node[name];

        if (name === CLASS_NAME || childNode === undefined) {
            continue;
        }

        const isValid = typeIs(childNode, "string")
            ? child.IsA(childNode)
            : isValidTree(child, childNode);

        if (!isValid) {
            return false;
        }

        validKeys.add(name);
    }

    for (const [key] of pairs(node)) {
        if (typeIs(key, "string") && !validKeys.has(key)) {
            return false;
        }
    }

    return true;
}

export function isValidTree<I extends Instance, N extends InstanceTreeNode>(
    instance: I,
    node: N,
): instance is EvaluateInstanceTree<N, I> {
    if (node.$className !== undefined && !instance.IsA(node.$className)) {
        return false;
    }

    return classIs(instance, "DataModel") ? isValidService(node) : isValidInstance(instance, node);
}
