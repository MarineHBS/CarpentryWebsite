import { Component, OnInit, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { PriceEstimateComponent } from '../price-estimate/price-estimate.component';

@Component({
  selector: 'app-request-offer',
  templateUrl: './request-offer.component.html',
  styleUrls: ['./request-offer.component.css']
})
export class RequestOfferComponent implements OnInit, AfterContentInit {

  @ViewChild('container', {read: ViewContainerRef}) container;
  values = new Map();

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.addNewComponent();
  }

  get priceEstimateValue(): number {
    let priceEstimateValue = 0;
    this.values.forEach(v => priceEstimateValue += v);
    return priceEstimateValue;
  }

  ngAfterContentInit(): void {
  }

  addNewComponent() {
    const priceEst = this.resolver.resolveComponentFactory(PriceEstimateComponent);
    const priceEstComponent = this.container.createComponent(priceEst);
    priceEstComponent.instance.priceEstimateResultEvent.subscribe(value => this.values.set(priceEstComponent, value));
    priceEstComponent.instance.needNewComponentEvent.subscribe(() => this.addNewComponent());

  }

}
