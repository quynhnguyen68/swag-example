import './page/swag-example-general';
import './component/swag-example-product';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('swag-example-module', {
    type: 'plugin',
    name: 'Example',
    description: 'Example',
    title: 'swag-example-module.mainMenuItemGeneral',
    color: '#ff3d58',
    icon: 'default-shopping-paper-bag-product',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        index: {
            components: {
                default: 'swag-example-general',
            },
            path: 'index',
        },
    },

    navigation: [{
        id: 'swag-example-module',
        label: 'swag-example-module.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'swag.example.module.index',
        icon: 'default-device-gamecontroler',
        position: 100,
        parent: 'sw-dashboard',
    }]
});
