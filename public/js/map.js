
    mapboxgl.accessToken = mapToken;
      const map = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/mapbox/streets-v12',
          center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
          zoom: 11.5 // starting zoom
      });

      const marker1 = new mapboxgl.Marker({color: "#fe424d"})
      .setLngLat(listing.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({offset: 25,closeOnMove: true,className: 'map-popup'})
      .setHTML(`<h5>${listing.location}</h5><p>Exact location provided after booking</p>`))
      .addTo(map);
