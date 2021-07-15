import React from 'react';
import { shallow } from 'enzyme';
import HmsNotFound from './';

let wrapper;

describe('HmsNotFound component', () => {
    beforeEach(() => {
        wrapper = shallow(<HmsNotFound />);
    });

    it('should be defined', () => {
        expect(typeof HmsNotFound).toEqual('function');
    });

    it('should be rendered without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
