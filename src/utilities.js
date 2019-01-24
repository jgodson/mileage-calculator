function calculateMileage(liters, km, units) {
  liters = parseFloat(liters);
  km = parseFloat(km);
  let mileage;
  switch (units) {
    case 'metric':
      mileage = liters / km * 100;
      break;
    case 'imperial':
      mileage = convertDistance(km, units) / convertVolume(liters, units);
      break;
    default:
      mileage = km / liters;
  }
  return mileage.toFixed(2);
}

function labelNames(units) {
  switch (units) {
    case 'metric':
      return {distance: "Kilometers", volume: "Liters", mileage: "L/100KM"};
    case 'imperial':
      return {distance: "Miles", volume: "Gallons", mileage: "MPG"};
    default:
      return {distance: "Kilometers", volume: "Liters", mileage: "KM/L"};
  }
}

function convertVolume(liters, units, invert = false) {
  liters = parseFloat(liters);
  let volume = liters;
  switch (units) {
    case 'metric':
      break;
    case 'imperial':
      volume = invert ? liters / 0.264172 : liters * 0.264172;
      break;
    default:
  }
  return volume.toFixed(2);
}

function convertDistance(km, units, invert = false) {
  km = parseFloat(km);
  let distance = km;
  switch (units) {
    case 'metric':
      break;
    case 'imperial':
      distance = invert ? km / 0.621371 : km * 0.621371;
      break;
    default:
  }
  return distance.toFixed(2);
}

function getImagePath(name) {
  return `./images/${name}.png`;
}

function convertDate(entryDate) {
  const date = new Date(entryDate);
  return date.toLocaleDateString();
}

function addIdToEntries({id, entries}) {
  entries.forEach((entry) => {
    entry.vehicleId = id;
  });
}

export {calculateMileage, labelNames, convertVolume, convertDistance, getImagePath, convertDate, addIdToEntries};
