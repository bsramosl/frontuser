import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapBrowserEvent } from 'ol';
import { toStringXY } from 'ol/coordinate';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
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
}

