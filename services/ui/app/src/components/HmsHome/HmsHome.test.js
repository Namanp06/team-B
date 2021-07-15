import React from 'react';
import { shallow } from 'enzyme';
import HmsHome from './';

let wrapper;

describe('HmsHome component', () => {
    beforeEach(() => {
        wrapper = shallow(<HmsHome />);
    });

    it('should be defined', () => {
        expect(typeof HmsHome).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
