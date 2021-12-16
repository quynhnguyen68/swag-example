import { shallowMount, createLocalVue } from '@vue/test-utils';

// Test component
import '../../../src/module/swag-example-module/page/swag-example-general';
import '../../../src/module/swag-example-module/component/swag-example-product';

const { Component } = Shopware;

const productData = [{
    id: '1',
    name: 'Product 1',
    price: [
        {
            gross: 100
        }
    ],
    media: [{
        media: {
            url: 'http://shopware.test/image1.png'
        }
    }]
},
    {
        id: '2',
        name: 'Product 2',
        price: [
            {
                gross: 80
            }
        ],
        media: [{
            media: {
                url: 'http://shopware.test/image2.png'
            }
        }]
    }];

function createWrapper(productData = []) {
    const localVue = createLocalVue();

    localVue.filter('currency', (currency) => currency);

    return shallowMount(Component.build('swag-example-general'), {
        localVue,
        stubs: {
            // 'swag-example-product': true,
            'sw-page': {
                template: '<div class="sw-page"><slot name="content"></slot></div>'
            },
            'sw-loader': true,
            'swag-example-product': Shopware.Component.build('swag-example-product'),
            'sw-card': {
                template: '<div><slot></slot></div>'
            }
        },

        provide: {
            repositoryFactory: {
                create: () =>  ({
                    search: ()=> Promise.resolve(productData)
                })
            }
        }
    });
}

describe('component/swag-example-general', () => {
    it('should show empty message', async () => {
        const wrapper = await createWrapper();
        expect(wrapper.find('.swag-example-general__empty').exists()).toBeTruthy();
    });

    it('should show the product list', async () => {
        const wrapper = await createWrapper(productData);
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.swag-example-general__empty').exists()).toBeFalsy();
        expect(wrapper.find('.swag-example-general__product-list').exists()).toBeTruthy();

        // const products = wrapper.findAll('swag-example-product-stub');
        const products = wrapper.findAll('.swag-example-product');

        expect(products.length).toEqual(2);
    });
});
