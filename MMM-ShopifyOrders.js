/* global Module */

/* Magic Mirror
 * Module: MMM-ShopifyOrders
 *
 * By 
 * MIT Licensed.
 */
// import '@shopify/shopify-api/adapters/node';

Module.register("MMM-ShopifyOrders", {
	defaults: {
		updateInterval: 60000,
		urgentLevel: 10,
		shopify: {
			orderFilter: 'unfulfilled', // any, fulfilled, unfulfilled, etc
			accessToken: 'your secret developer app admin api access token',
			storeUrl: 'https://your-dev-store.myshopify.com'
		}
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		this.orderCount = '';
		this.sendSocketNotification('MMM-ShopifyOrders-GET_ORDER_COUNT', this.config);

		setInterval(function() {
			this.sendSocketNotification('MMM-ShopifyOrders-GET_ORDER_COUNT', this.config);
		}, this.config.updateInterval);
	},

	getDom: function() {
		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.classList.add("MMM-ShopifyOrders");
		var h1 = document.createElement("h1");		// If this.dataRequest is not empty
		if (this.orderCount > 0 ){
			h1.innerHTML = this.orderCount + " Orders";
		}
		if (this.orderCount > this.config.urgentLevel ){
			h1.classList.add("urgent");
		}
		wrapper.appendChild(h1)
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-ShopifyOrders.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-ShopifyOrders-ORDERS_UPDATE") {
			// set dataNotification
			this.orderCount = JSON.parse(payload).count;
			this.updateDom();
		}
	},
});
