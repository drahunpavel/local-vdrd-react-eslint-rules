export const isUpperSnakeCase = name => /^[A-Z][A-Z0-9_]*$/.test(name);

export const isPascalCase = name => /^[A-Z][a-zA-Z0-9]*$/.test(name);

export const isCamelCase = name => /^[a-z][a-zA-Z0-9]*$/.test(name);
