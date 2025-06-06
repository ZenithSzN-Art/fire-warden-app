// List of University of Winchester locations
const locations = [
  'Alwyn Hall',
  'Beech Glade',
  'Bowers Building',
  'Burma Road Student Village',
  'Centre for Sport',
  'Chapel',
  'The Cottage',
  'Fred Wheeler Building',
  'Herbert Jarman Building',
  'Holm Lodge',
  'Kenneth Kettle Building',
  'King Alfred Centre',
  'Martial Rose Library',
  'Masters Lodge',
  'Medecroft',
  'Medecroft Annexe',
  'Paul Chamberlain Building',
  'Queen\'s Road Student Village',
  'St Alphege',
  'St Edburga',
  'St Elizabeth\'s Hall',
  'St Grimbald\'s Court',
  'St James\' Hall',
  'St Swithun\'s Lodge',
  'The Stripe',
  'Business School',
  'Tom Atkinson Building',
  'West Downs Centre',
  'West Downs Student Village',
  'Winton Building',
  'Students\' Union'
];

class LocationModel {
  // Get all locations
  getAllLocations() {
    return locations;
  }
  
  // Check if a location is valid
  isValidLocation(location) {
    return locations.includes(location);
  }
}

module.exports = new LocationModel();