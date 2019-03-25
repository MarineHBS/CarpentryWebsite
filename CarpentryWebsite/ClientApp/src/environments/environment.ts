// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAs8cYZGJ5iiUB6vIwdJrTz9zA9zROdiQk',
    authDomain: 'carpentrywebsite.firebaseapp.com',
    databaseURL: 'https://carpentrywebsite.firebaseio.com',
    projectId: 'carpentrywebsite',
    storageBucket: 'carpentrywebsite.appspot.com',
    messagingSenderId: '829013641071'
  }
};
