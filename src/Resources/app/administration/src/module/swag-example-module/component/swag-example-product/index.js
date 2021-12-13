import template from './swag-example-product.html.twig';
import './swag-example-product.scss';

Shopware.Component.register('swag-example-product', {
    template,

    props: {
        product: {
            type: Object,
            required: true,
        }
    },

    computed: {
        mediaUrl() {
            return this.product?.media[0].media?.url ?? '';
        },

        price() {
            return this.product?.price[0].gross ?? '';
        }
    }
});
