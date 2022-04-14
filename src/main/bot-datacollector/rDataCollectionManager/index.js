class rDataCollectionManager {
     static checkIfIdentifierIsValid(identifier) {
          const identifiers = require('../../bot/rHelpManager/helpDocs.json').docs.map(i => i.id);
          if (identifiers.indexOf(identifier) < 0) return false;
          return true;
     }

     static async addDataAndIdentifierArrayToDatabase(data, id) {
          return false;
     }
}

module.exports = rDataCollectionManager;