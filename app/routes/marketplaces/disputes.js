Balanced.DisputesIndexRoute = Balanced.AuthRoute.extend({
	pageTitle: 'Disputes',

	setupController: function(controller, model) {
		controller.send('reload');
	}
});

Balanced.DisputesDisputeRoute = Balanced.AuthRoute.extend({
	title: 'Dispute',

	pageTitle: function(route, setTitle) {
		var dispute = route.controller.content;
		return Balanced.Utils.maybeDeferredLoading(dispute, setTitle, function() {
			return 'Dispute: loading ...';
		}, function() {
			return 'Dispute: %@'.fmt(dispute.get('page_title'));
		});
	},

	model: function(params) {
		var marketplace = this.modelFor('marketplace');
		return marketplace.then(function(marketplace) {
			var disputeUri = Balanced.Utils.combineUri(marketplace.get('disputes_uri'), params.dispute_id);
			// var disputeUri = Balanced.Dispute.constructUri(params.dispute_id);
			return Balanced.Dispute.find(disputeUri);
		});
	}
});
