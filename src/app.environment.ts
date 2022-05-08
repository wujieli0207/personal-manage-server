export const environment = process.env.NODE_ENV;

export const isDevEnv = Object.is(environment, 'development');
export const isProdEnv = Object.is(environment, 'production');
export const isTestEnv = Object.is(environment, 'test');
