import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { PriceEstimateComponent } from '../price-estimate/price-estimate.component';

@Component({
  selector: 'app-request-offer',
  templateUrl: './request-offer.component.html',
  styleUrls: ['./request-offer.component.css']
})
export class RequestOfferComponent implements OnInit, AfterContentInit {

  @ViewChild('container', {read: ViewContainerRef}) container;
  priceEstimateValue = 0;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.addNewComponent();
  }

  getPriceEstimateValue(value: number) {
    this.priceEstimateValue += value;
    console.log('valehaoekoepthkaeth' + this.priceEstimateValue);
  }

  ngAfterContentInit(): void {
  }

  addNewComponent() {
    const priceEst = this.resolver.resolveComponentFactory(PriceEstimateComponent);
    const priceEstComponent = this.container.createComponent(priceEst);
    priceEstComponent.instance.priceEstimateResultEvent.subscribe(value => this.priceEstimateValue += value);
    priceEstComponent.instance.needNewComponentEvent.subscribe(event => this.addNewComponent());
  }

}
