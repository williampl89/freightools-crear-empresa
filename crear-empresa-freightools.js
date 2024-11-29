// Import required libraries
const hubspot = require('@hubspot/api-client');
const axios = require('axios')

exports.main = (event, callback) => {

	const hubspotClient = new hubspot.Client({
		apiKey: process.env.HAPIKEY
	});

	let companyname = event.inputFields['name'];
	let companylegal_entity = event.inputFields['legal_entity'];
	let companyvat__freightools_ = event.inputFields['vat__freightools_'];
	let companyaddress = event.inputFields['address'];
	let companycity = event.inputFields['city'];
	let companycountry_hubspot = event.inputFields['country_hubspot'];
	let companyphone = event.inputFields['phone'];

	let supplier = event.inputFields['supplier'];
	let supplier_type__freightools_ = event.inputFields['supplier_type__freightools_'];
	let customer = event.inputFields['customer'];
	let customer_type__freightools_ = event.inputFields['customer_type__freightools_'];
	let id__freightools_ = event.inputFields['id__freightools_'];
	let customercurrencies = event.inputFields['currencies'];


	let BodyMain = {
		"CountryId": companycountry_hubspot,
		"CurrencyId": customercurrencies,
		"Name": companyname,
		"LegalEntity": companylegal_entity,
		"VAT": companyvat__freightools_,
		"Address": companyaddress,
		"City": companycity,
		"Tel": companyphone,
		"IsSupplier": supplier,
		"SupplierType": supplier_type__freightools_,
		"IsCustomer": customer,
		"CustomerType": customer_type__freightools_,
	};
	
	if (id__freightools_ === undefined || id__freightools_ === "") {
		BodyMain.InternalIdentity = 'add';
	} else {
		BodyMain.Id = id__freightools_;
	}
	

	const headers = {
		'Content-Type': 'application/json'
	};

	axios.post(`https://system.freightools.com/api/Public/SetPartner?licenseKey=${process.env.LICENCIAFREIGHTOOLS}`,
		BodyMain,
		{headers})
	.then(response => {
	var idfreightools = response.data.Id;

	hubspotClient.crm.companies.basicApi.update(event.object.objectId, 
	{
		"properties": 
		{ 
			"id__freightools_": idfreightools
		}
	});
});

}