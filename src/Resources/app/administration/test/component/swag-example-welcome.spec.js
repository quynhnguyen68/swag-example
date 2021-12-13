import { shallowMount } from '@vue/test-utils';

// Test component
import '../../src/component/swag-example-welcome';

const { Component } = Shopware;

function createWrapper() {
    return shallowMount(Component.build('swag-example-welcome'), {
        stubs: {
            'sw-text-field': {
                props: ['value'],
                template: `
                    <input class="sw-text-field" type="text" :value="value" @input="$emit('input', $event.target.value)" />
                `
            },
            'sw-button': true
        }
    });
}

describe('component/swag-example-welcome', () => {
    it('should show welcome message', () => {
        const wrapper = createWrapper();
        const message = wrapper.find('.swag-example-welcome__message');

        expect(message.text()).toEqual('Welcome to Boost Day 2021');
    });

    it('should show an error when username is less than 7 characters', () => {
        const wrapper = createWrapper();
        const error = wrapper.find('.swag-example-welcome__error');

        expect(error.exists()).toBeTruthy();
    });

    it('should show an error when username is whitespace', async () => {
        const wrapper = createWrapper();
        const input = wrapper.find('.sw-text-field');

        await input.setValue(' '.repeat(7));
        await input.trigger('input');

        const error = wrapper.find('.swag-example-welcome__error');
        expect(error.exists()).toBeTruthy();
    });

    it('should not show an error when username is 7 characters or more', async () => {
        const wrapper = createWrapper();
        const input = wrapper.find('.sw-text-field');

        await input.setValue('Hello World');
        await input.trigger('input');

        const error = wrapper.find('.swag-example-welcome__error');
        expect(error.exists()).toBeFalsy();
    });
});
