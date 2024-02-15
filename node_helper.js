/* Magic Mirror
 * Node Helper: MMM-ShopifyOrders
 *
 * By 
 * MIT Licensed.
 */
var NodeHelper = require("node_helper");
var XMLHttpRequest = require('xhr2');

const ONE_MINUTE_MS = 60 * 1000;
const ONE_DAY_MS = 24 * 60 * ONE_MINUTE_MS;

module.exports = NodeHelper.create({
	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && !this.client) {
			this.config = payload;
			this.process()
		}
	},

	process() {
		var urlApi = this.config.shopify.storeUrl + '/admin/api/2023-10/orders/count.json?status=' + this.config.shopify.orderFilter
		var dataRequest = new XMLHttpRequest();
		dataRequest.open("GET", urlApi, true);
		dataRequest.setRequestHeader('X-Shopify-Access-Token', this.config.shopify.accessToken);
		self = this;
		dataRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.sendSocketNotification("MMM-ShopifyOrders-ORDERS_UPDATE", this.response);
				}
			}
			self.scheduleNextFetch(self.config.updateIntervalInMinutes * ONE_MINUTE_MS);
		};
		dataRequest.send();
	},

	scheduleNextFetch(delayMs) {
		clearTimeout(this.updateTimer);
	
		this.updateTimer = setTimeout(() => {
		  this.process();
		}, Math.max(delayMs, ONE_DAY_MS));
	},
});
