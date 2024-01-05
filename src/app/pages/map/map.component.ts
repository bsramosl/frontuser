import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapBrowserEvent } from 'ol';
import { toStringXY } from 'ol/coordinate';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Geometry } from 'ol/geom';
import { BarService } from '@app/services/bar/bar.service';
import { Bar } from '@app/models/bar';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent { 
  map!: Map;
  vectorSource!: VectorSource<Feature<Geometry>>;
  vectorLayer!: VectorLayer<VectorSource<Feature<Geometry>>>;
  list: Bar[] = [];

 
  constructor(private bar:BarService){}
 
  ngOnInit() {    
    this.bar.getList().subscribe((data:any)=>{     
      this.list = data    
      this.initializeMap();
     });   
     this.getUserLocation();    
  } 

  initializeMap() {   
    this.vectorSource = new VectorSource<Feature<Geometry>>();    
    
    this.list.forEach(bar => {
          const marker = new Feature({
          geometry: new Point(fromLonLat([bar.longitud ?? 0, bar.latitud ?? 0], 'EPSG:4326')),
          id_bar: bar.id_bar,
          nombre_bar: bar.nombre_bar,
          imagen: bar.imagen,
        });
          
        this.vectorSource.addFeature(marker); 
      });
    
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/icon/market.png', // Reemplaza esto con la ruta a tu icono de marcador
        }),
      }),
    });
    

    this.map = new Map({
      target: 'map', // ID del elemento HTML que contendrá el mapa
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: [-8861349.65, -239383.20],
        zoom: 17,
      }),
    });
 
  } 

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = toLonLat([position.coords.longitude, position.coords.latitude], 'EPSG:4326');
        console.log(coordinates)
        // Ahora puedes agregar un marcador para la ubicación del usuario
        const userMarker = new Feature({
          geometry: new Point(fromLonLat(coordinates, 'EPSG:4326')),
          nombre_bar: 'Tu Ubicación',
          imagen: 'assets/icon/location.png', // Reemplaza con la ruta a tu icono de ubicación
        });

        this.vectorSource.addFeature(userMarker);
      });
    }
  }

}

