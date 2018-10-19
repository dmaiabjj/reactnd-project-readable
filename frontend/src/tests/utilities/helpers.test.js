import {formatDate} from '../../utilities/helpers'

describe('Helpers', () => {

    it('[Helpers] should formatDate', () => {
        const timestamp = 1539965208952;
        const expected  = '1:06:PM | 2018-10-19'
        expect(formatDate(timestamp))
            .toEqual(expected);
    });

})