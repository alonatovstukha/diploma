let mapObj = new GMaps({
  el: '#map',
  lat: 51.5051212,
  lng: 31.3353433,
  zoom: 12,
});
let m = mapObj.addMarker({
  lat: 51.5051212,
  lng: 31.3353433,
  title: 'ЧНТУ',
  infoWindow: {
    content: '<h6>Національний університет "Чернігівська політехніка"</h6><div>вулиця Шевченка, 95, Чернігів, Чернігівська область, 14000</div>',
    maxWidth: 500
  }
});