// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  oauth_main: {
    client_id: 'CtwI5eYLLth2RTb7C6vSuY6LeufjPWFD7xfB8kxM',
    redirect_uri: 'http://localhost:4200/account/oauth2/authorize',
    endpoint_authorize: 'http://localhost:8000/o/authorize/',
    endpoint_token: 'http://localhost:8000/o/token/',
    state_cookie_name: 'oauth2_state',
    token_storage_key: 'oauth2_token',
    default_scope: '*',
  },
};
