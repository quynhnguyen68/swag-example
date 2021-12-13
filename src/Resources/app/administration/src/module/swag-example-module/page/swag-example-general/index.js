import template from './swag-example-general.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('swag-example-general', {
    template,

    inject: ['repositoryFactory'],

    data() {
        return {
           products: [],
            isLoading: false,
        }
    },

    computed: {
        productRepository() {
            return this.repositoryFactory.create('product');
        },

        productCriteria() {
            const criteria = new Criteria();
            criteria.addAssociation('tags');
            criteria.addAssociation('media');
            criteria.addFilter(Criteria.equals('tags.name', 'squid-game'));

            return criteria;
        }
    },

    created() {
        this.getProducts();
    },

    methods: {
        getProducts() {
            this.isLoading = true;

            this.productRepository.search(this.productCriteria).then(products => {
                this.products = products;
            }).finally(() => {
                this.isLoading = false;
            });
        }
    },
});
