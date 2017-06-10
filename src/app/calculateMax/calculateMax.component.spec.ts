import { TestBed, inject } from '@angular/core/testing';

import { CalculateMaxComponent } from './calculateMax.component';

describe('a calculateMax component', () => {
	let component: CalculateMaxComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CalculateMaxComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CalculateMaxComponent], (CalculateMaxComponent) => {
		component = CalculateMaxComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});