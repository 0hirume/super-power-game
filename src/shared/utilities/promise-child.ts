const MAX_WAIT_TIME = 5;

export async function promiseChildWhichIsA<T extends keyof Instances>(
    parent: Instance,
    className: T,
): Promise<Instances[T]> {
    const child = parent.FindFirstChildWhichIsA(className);

    if (child !== undefined) {
        return child;
    }

    const warner = new Promise<void>(() => {
        task.delay(MAX_WAIT_TIME, () => {
            warn(`Infinite wait possible for a '${className}' under '${parent.GetFullName()}'`);
        });
    });

    const connections: RBXScriptConnection[] = [];

    const promise = new Promise<Instances[T]>((resolve, reject) => {
        connections.push(
            parent.ChildAdded.Connect((addedChild) => {
                if (addedChild.IsA(className)) {
                    resolve(addedChild);
                }
            }),
            parent.AncestryChanged.Connect((_, ancestor) => {
                if (ancestor === undefined) {
                    reject();
                }
            }),
        );
    });

    promise
        .finally(() => {
            warner.cancel();

            for (const connection of connections) {
                connection.Disconnect();
            }
        })
        .catch(warn);

    return promise;
}

export async function promiseChildOfClass<T extends keyof Instances>(
    parent: Instance,
    className: T,
): Promise<Instances[T]> {
    const child = parent.FindFirstChildOfClass(className);

    if (child !== undefined) {
        return child;
    }

    const warner = new Promise<void>(() => {
        task.delay(MAX_WAIT_TIME, () => {
            warn(`Infinite wait possible for a '${className}' under '${parent.GetFullName()}'`);
        });
    });

    const connections: RBXScriptConnection[] = [];

    const promise = new Promise<Instances[T]>((resolve, reject) => {
        connections.push(
            parent.ChildAdded.Connect((addedChild) => {
                if (classIs(addedChild, className)) {
                    resolve(addedChild);
                }
            }),
            parent.AncestryChanged.Connect((_, ancestor) => {
                if (ancestor === undefined) {
                    reject();
                }
            }),
        );
    });

    promise
        .finally(() => {
            warner.cancel();

            for (const connection of connections) {
                connection.Disconnect();
            }
        })
        .catch(warn);

    return promise;
}

export async function promiseChild(parent: Instance, childName: string): Promise<Instance> {
    const child = parent.FindFirstChild(childName);

    if (child !== undefined) {
        return child;
    }

    const warner = new Promise<void>(() => {
        task.delay(MAX_WAIT_TIME, () => {
            warn(`Infinite wait possible for '${parent.GetFullName()}.${childName}'`);
        });
    });

    const connections: RBXScriptConnection[] = [];

    const promise = new Promise<Instance>((resolve, reject) => {
        connections.push(
            parent.ChildAdded.Connect((addedChild) => {
                if (addedChild.Name === childName) {
                    resolve(addedChild);
                } else {
                    connections.push(
                        addedChild.GetPropertyChangedSignal("Name").Connect(() => {
                            if (addedChild.Name === childName && addedChild.Parent === parent) {
                                resolve(addedChild);
                            }
                        }),
                    );
                }
            }),
            parent.AncestryChanged.Connect((_, ancestor) => {
                if (ancestor === undefined) {
                    reject();
                }
            }),
        );
    });

    promise
        .finally(() => {
            warner.cancel();

            for (const connection of connections) {
                connection.Disconnect();
            }
        })
        .catch(warn);

    return promise;
}
