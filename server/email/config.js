var mandrill = require('../../node_modules/mandrill-api/mandrill');
exports.mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API || '');