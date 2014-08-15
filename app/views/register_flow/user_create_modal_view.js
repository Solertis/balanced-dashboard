Balanced.UserCreateModalView = Balanced.RegisterFlowBaseModal.extend({
	templateName: "register_flow/user_create_modal",
	title: "Create an account",
	submitButtonText: "Create",
	elementId: "account-create",

	auth: Balanced.Auth,

	model: function() {
		return Balanced.UserAccountFactory.create({
			email_address: "carlos",
			password: "vlrjnvrljknvr",
			passwordConfirm: "vlrjnvrljknvr"
		});
	}.property(),

	isSaving: false,

	getRegistrationController: function() {
		return this.get("container").lookup("controller:registration");
	},

	save: function(model, apiKey) {
		var self = this;
		var controller = this.getRegistrationController();
		this.set("isSaving", true);

		return controller
			.join(model, apiKey)
			.then(function(marketplace) {
				self.set("isSaving", false);
				self.close();
				return Ember.RSVP.resolve(marketplace);
			}, function() {
				self.set("isSaving", false);
				return Ember.RSVP.reject();
			});
	},

	actions: {
		nextStep: function(marketplace) {
			this.openNext(Balanced.ApiKeyCreateModalView);

			var controller = this.getModalNotificationController();
			controller.alertSuccess("Login created");
		},

		save: function() {
			var self = this;
			var model = this.get("model");
			var apiKey = this.get("auth.authToken");
			this.save(model, apiKey)
				.then(function(marketplace) {
					self.send("nextStep", marketplace);
				});
		}
	}
});
