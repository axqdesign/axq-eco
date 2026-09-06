import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultAttributes from '../defaultAttributes';
import { AXQIcon, AXQIcons } from '../types';
import { AXQIconComponent } from './axqdesign-icon.component';
import { provideAXQIcons } from './axqdesign-icon.provider';

describe('AXQIconComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  const getSvgAttr = (attr: string) => fixture.nativeElement.querySelector('svg').getAttribute(attr);
  let icon: AXQIcon = { name: 'test', type: 'filled', nodes: [['path', { d: 'M8 7h-4', key: 'svg-0' }]] };
  let icons: AXQIcons = { IconTest: icon };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AXQIconComponent, TestHostComponent],
      providers: [provideAXQIcons(icons)]
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
    expect(getSvgAttr('width')).toBe(defaultAttributes.filled.width.toString(10));
    expect(getSvgAttr('fill')).toBe(defaultAttributes.filled.fill);
    expect(getSvgAttr('stroke')).toBe(defaultAttributes.filled.stroke);
    expect(getSvgAttr('stroke-width')).toBe(null);
    expect(getSvgAttr('stroke-linecap')).toBe(null);
    expect(getSvgAttr('stroke-linejoin')).toBe(null);
  });

  it('should set size', () => {
    const size = 40;
    hostComponent.size = size;
    fixture.detectChanges();
    expect(getSvgAttr('height')).toBe(size.toString(10));
    expect(getSvgAttr('width')).toBe(size.toString(10));
  })

  it('should set color', () => {
    const color = '#abcabc';
    hostComponent.color = color;
    fixture.detectChanges();
    expect(getSvgAttr('fill')).toBe(color);
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
        icon="test"
        [svgClass]="customClass"
        [color]="color"
        [size]="size"
      />
    `,
  })
  class TestHostComponent {
    size?: number;
    color?: string;
    customClass = 'test-class';
  }
})
