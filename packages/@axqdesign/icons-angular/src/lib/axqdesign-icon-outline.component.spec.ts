import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultAttributes from '../defaultAttributes';
import { AXQIcon } from '../types';
import { AXQIconComponent } from './axqdesign-icon.component';

describe('AXQIconComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  const getSvgAttr = (attr: string) => fixture.nativeElement.querySelector('svg').getAttribute(attr);
  let icon: AXQIcon = { name: 'test', type: 'outline', nodes: [['path', { d: 'M8 7h-4', key: 'svg-0' }]] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AXQIconComponent, TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  })

  it('should create', () => {
    fixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });

  it('should have all default values if not provided', () => {
    fixture.detectChanges();
    expect(getSvgAttr('width')).toBe(defaultAttributes.outline.width.toString(10));
    expect(getSvgAttr('fill')).toBe(defaultAttributes.outline.fill);
    expect(getSvgAttr('stroke')).toBe(defaultAttributes.outline.stroke);
    expect(getSvgAttr('stroke-width')).toBe(defaultAttributes.outline['stroke-width'].toString(10));
    expect(getSvgAttr('stroke-linecap')).toBe(defaultAttributes.outline['stroke-linecap']);
    expect(getSvgAttr('stroke-linejoin')).toBe(defaultAttributes.outline['stroke-linejoin']);
  });

  it('should set size', () => {
    const size = 32;
    hostComponent.size = size;
    fixture.detectChanges();
    expect(getSvgAttr('height')).toBe(size.toString(10));
    expect(getSvgAttr('width')).toBe(size.toString(10));
  })

  it('should set color', () => {
    const color = '#abcabc';
    hostComponent.color = color;
    fixture.detectChanges();
    expect(getSvgAttr('stroke')).toBe(color);
  })

  it('should set stroke width', () => {
    const stroke = 1.75;
    hostComponent.stroke = stroke;
    fixture.detectChanges();
    expect(getSvgAttr('stroke-width')).toBe(stroke.toString(10));
  })

  it('should set stroke width to 0', () => {
    hostComponent.stroke = 0;
    fixture.detectChanges();
    expect(getSvgAttr('stroke-width')).toBe('0');
  })

  it('should add all classes', () => {
    fixture.detectChanges();
    expect(getSvgAttr('class')).toBe('axqdesign-icon axqdesign-icon-test test-class');
  })

  @Component({
    selector: 'AXQ Design-test',
    imports: [AXQIconComponent],
    template: `
      <axqdesign-icon
        [icon]="iconTest"
        [svgClass]="customClass"
        [color]="color"
        [size]="size"
        [stroke]="stroke"
      />
    `,
  })
  class TestHostComponent {
    size?: number;
    color?: string;
    stroke?: number;
    customClass = 'test-class';
    iconTest = icon;
  }
})
