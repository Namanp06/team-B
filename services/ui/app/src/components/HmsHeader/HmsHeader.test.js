import React from 'react';
import { shallow } from 'enzyme';
import HmsHeader from './';

let wrapper;

describe('HmsHeader component', () => {
    beforeEach(() => {
        wrapper = shallow(<HmsHeader />);
    });

    it('should be defined', () => {
        expect(typeof HmsHeader).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
