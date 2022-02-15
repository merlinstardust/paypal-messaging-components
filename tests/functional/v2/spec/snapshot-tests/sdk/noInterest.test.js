import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupSDK } from './setupSDK';
import * as config from '../../../config/index';

import { openNoInterestView, openTermsPage, openCreditApplicationLogin } from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const integration = 'sdk';

describe.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - SDK Modal - %s',
    (country, account, { viewport, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupSDK(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        test(`Amount:${amount} - Shows correct content for amount - ${viewport}`, async () => {
            await openNoInterestView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Click to see T&Cs - ${viewport}`, async () => {
            await openTermsPage(modalFrame);
        });

        test(`Amount:${amount} - Clicking apply now button goes to credit application for amount - ${viewport}`, async () => {
            await openCreditApplicationLogin(modalFrame);
        });
    }
);