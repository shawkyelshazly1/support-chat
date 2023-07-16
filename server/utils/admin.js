// generate random unique username
exports.generateUniqueAdminUsername = async (model, names, company) => {
	let username = (
		names[0].substring(0, 1) +
		names[1] +
		"_" +
		String(Math.floor(Math.random() * 999))
	).toLowerCase();
	return await model
		.findOne({ $and: [{ username }, { company }] })
		.then((account) => {
			if (account) {
				return this.generateUniqueUsername(model, names, company);
			}
			return username;
		})
		.catch((error) => {
			console.error(error);
		});
};
