import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as Proj from 'ol/proj';
import { defaults as defaultControls} from 'ol/control';


export const DEFAULT_HEIGHT = "500px";
export const DEFAULT_WIDTH = "500px";
@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit, AfterViewInit{
  @Input() lat!:number;
  @Input() lon!:number;
  @Input() zoom!:number;
  @Input() width:string | number = DEFAULT_WIDTH;
  @Input() height:string | number = DEFAULT_HEIGHT;

  map!:Map

  private mapEL!:HTMLElement;

  constructor(private elementRef:ElementRef){}

  ngOnInit(): void {
    this.mapEL = this.elementRef.nativeElement.querySelector('#map');
    this.setSize();
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls().extend([])

    })
  }

  private setSize():void{
    if(this.mapEL){
      const styles =this.mapEL.style;
      styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }
}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value:any):string{
  if(value == null){
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}