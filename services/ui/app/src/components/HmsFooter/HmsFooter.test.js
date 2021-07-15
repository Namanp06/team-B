import React from 'react';
import { shallow } from 'enzyme';
import HmsFooter from './';

let wrapper;

describe('HmsFooter component', () => {
    beforeEach(() => {
        wrapper = shallow(<HmsFooter />);
    });

    it('should be defined', () => {
        expect(typeof HmsFooter).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
