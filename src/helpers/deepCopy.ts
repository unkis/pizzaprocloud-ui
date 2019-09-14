export function deepCopy<T extends Object>(object: T) : T {
  let newObject: typeof object;
  if (Array.isArray(object)) {
    return deepArrayCopy(object);
  } else if (typeof object === 'object') {
    newObject = { ...object };
  } else {
    return object;
  }
  for (let key2 of Object.keys(newObject)) {
    let key = key2 as keyof typeof newObject;
    if (Array.isArray(newObject[key])) {

      newObject[key] = deepArrayCopy(newObject[key] as any);
    } else if (typeof newObject[key] === 'object') {
      newObject[key] = deepCopy(newObject[key]);
    }
  }
  return newObject;
};

function deepArrayCopy<T extends Array<any>>(arr: T):any {//FIXME
  return arr.map((item: any) => deepCopy(item));
};
