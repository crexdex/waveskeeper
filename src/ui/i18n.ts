import * as i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { default as Locize } from 'i18next-locize-backend';


i18n
    .use(reactI18nextModule)
    .use(Locize)
    .init({
        fallbackLng: 'en',
        appendNamespaceToCIMode: true,
        saveMissing: true,
        ns: ['extension'],
        defaultNS: 'extension',

        debug: true,
        keySeparator: '.', // we use content as keys
        nsSeparator: '.', // we use content as keys

        backend: {
            projectId: '30ffe655-de56-4196-b274-5edc3080c724', // <-- replace with your projectId
            apiKey: '5af41ced-a862-4947-a079-2c7999367925',
            referenceLng: 'en',
            // loadPath: 'https://locize.wvservices.com/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
            // privatePath: 'https://locize.wvservices.com/private/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
            // pullPath: 'https://locize.wvservices.com/pull/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
            // getLanguagesPath: 'https://locize.wvservices.com/languages/{{projectId}}',
            // addPath: 'https://locize.wvservices.com/missing/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
            // updatePath: 'https://locize.wvservices.com/update/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
        },

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ',',
            format: function(value, format, lng) {
                if (format === 'uppercase') return value.toUpperCase();
                return value;
            }
        },

        react: {
            wait: true
        }
    });

export { i18n };
