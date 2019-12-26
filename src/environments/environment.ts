// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:8000/',
  apiRegisterUrl: 'signup/',
  apiLoginUrl: 'login/',
  apiForgotPassUrl: 'forgotpassword/',
  apiResetPassUrl: 'resetpassword/',
  apiLabelsUrl: 'api/labels/',
  apiNoteUrl: 'api/notes/',
  apiUserPicUrl: 'profilepic/',
  apiUpdatePicUrl: 'updatepic/',
  apiDetailLabelUrl: 'api/label/',
  apiArchiveUrl: 'api/archives/',
  apiTrashedUrl: 'api/trashed/',
  apiDeleteUrl: 'api/note/',
  apiReminderUrl: 'api/reminders/',
  apiLabelsNoteUrl: 'api/labelnote/',
  apiSearchNoteUrl: 'api/elasticsearch/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
