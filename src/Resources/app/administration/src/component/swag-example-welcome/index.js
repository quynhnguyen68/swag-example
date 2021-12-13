import template from './swag-example-welcome.html.twig';
import './swag-example-welcome.scss';

const { Component } = Shopware;

Component.register('swag-example-welcome', {
    template,

    data() {
        return {
            message: 'Welcome to Boost Day 2021',
            username: '',
        }
    },

    computed: {
        error () {
            return this.username.trim().length < 7
        }
    }
});
