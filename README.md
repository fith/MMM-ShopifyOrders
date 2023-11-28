# MMM-ShopifyOrders

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

For Shopify store owners! 

Display your open order count on your MagicMirror. Set an urgency threshold so the text glows if orders are piling up.

[alt text](https://github.com/fith/MMM-ShopifyOrders/blob/main/docs/urgency.png?raw=true)

Supports internationalization of "Orders" via translation json files.

Bootstrapped using https://github.com/roramirez/MagicMirror-Module-Template

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-ShopifyOrders',
            config: {
                // See below for configurable options
                updateInterval: 60000,
				urgentLevel: 10,
				shopify: {
                    accessToken: 'your secret developer app admin api access token',
                    storeUrl: 'https://your-dev-store.myshopify.com',
                    orderFilter: 'unfulfilled', // any, fulfilled, unfulfilled, etc
				}
            }
        }
    ]
}
```

## Configuration options

| Option           | Type                | Default            | Necessity | Description                                                          |
|----------------- |-------------------- |------------------- |---------- |--------------------------------------------------------------------- |
| `updateInterval` | `int`(milliseconds) | 60000ms (1 minute) | Optional  | How often to update the order count (by hitting the Shopify API).    |
| `urgentLevel`    | `int` (count)       | 10                 | Optional  | If there are more orders than this, the count will glow with ugency. |
| `shopify:accessToken` | `string`       |                    | Required  | Shopify developer app Admin API token.                               |
| `shopify:storeUrl` | `url`             |                    | Required  | Your Shopify dev store url. The myshopify.com one.                   |
| `shopify:orderFilter` | `string`       | 'unfulfilled'      | Optional  | Which order statuses to count: any, unfulfilled, fulfilled           |
