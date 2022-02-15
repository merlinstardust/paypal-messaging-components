import { filterPermutations, getTestName, logTestName } from '../../../utils/index';
import { setupStandalone } from './setupStandalone';
import * as config from '../../../config/index';

import { openShortTermView, donutsShowCorrectPayment } from '../../../testFn';

let modalFrame;
const { CONFIG_PATH } = process.env;
const [LOCALE, ACCOUNT] = CONFIG_PATH.split('/');
const LOCALE_CONFIG = config[LOCALE];
const integration = 'standalone';

describe.each(filterPermutations([LOCALE_CONFIG], [ACCOUNT]))(
    '%s - Standalone Modal - %s',
    (country, account, { viewport, minAmount, maxAmount, amount, modalContent }) => {
        beforeEach(async () => {
            ({ modalFrame } = await setupStandalone(viewport, account, amount));
            logTestName(getTestName(country, integration, account, amount, viewport));
        });

        afterEach(async () => {
            page.close();
        });

        test(`Amount:${amount} - Shows correct subheadline for amount - ${viewport}`, async () => {
            await openShortTermView(
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });

        test(`Amount:${amount} - Donuts show correct periodic payment for amount - ${viewport}`, async () => {
            await donutsShowCorrectPayment(
                amount,
                minAmount,
                maxAmount,
                modalFrame,
                modalContent,
                getTestName(country, integration, account, amount, viewport)
            );
        });
    }
);