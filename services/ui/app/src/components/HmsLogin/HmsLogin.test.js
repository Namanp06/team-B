import React from 'react';
import { shallow } from 'enzyme';
import HmsLogin from './';

let wrapper;

describe('HmsLogin component', () => {
    beforeEach(() => {
        wrapper = shallow(<HmsLogin />);
    });

    it('should be defined', () => {
        expect(typeof HmsLogin).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
