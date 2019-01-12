// `ng build --env=dev` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.i7.dev.jroslaniec.com',
  wsUrl: 'wss://api.i7.dev.jroslaniec.com',
  oauth_main: {
    client_id: 't4QAgWdo4XQfxu9IUSvSAEvdQNebbSkFLkGsb5ok',
    redirect_uri: 'http://localhost:4200/account/oauth2/authorize',
    endpoint_authorize: 'https://api.i7.dev.jroslaniec.com/o/authorize/',
    endpoint_token: 'https://api.i7.dev.jroslaniec.com/o/token/',
    state_cookie_name: 'oauth2_state',
    token_storage_key: 'oauth2_token',
    default_scope: '*',
  },
  mapbox: {
    accessToken: 'pk.eyJ1Ijoiam1pbGtvd3NraSIsImEiOiJjamx1b2NiMjEwbGN5M3BsOTY5cWc2eHZlIn0.WXgccAkDjsdfq2QCFLowfQ',
    apiUrl: 'https://api.mapbox.com/geocoding/v5'
  }
}
