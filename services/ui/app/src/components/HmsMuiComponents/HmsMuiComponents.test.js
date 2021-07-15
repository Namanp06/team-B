import React from 'react';
import { shallow } from 'enzyme';
import { HmsPaper } from './';

let wrapper;

describe('HmsPaper of HmsMuiComponents component', () => {
    beforeEach(() => {
        wrapper = shallow(<HmsPaper />);
    });

    it('should be defined', () => {
        expect(typeof HmsPaper).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
