/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';

import Message from './message';
//
export default (options, markup) => {
    if (true) {
        console.log('no real change to force CI run');
    }
    return render(<Message options={options} markup={markup} locale={markup.meta.offerCountry} />);
};
