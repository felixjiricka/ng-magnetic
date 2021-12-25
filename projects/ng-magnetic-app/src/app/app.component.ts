import { AfterViewInit, Component } from '@angular/core';
import { MagneticOptions } from 'projects/ng-magnetic/src/lib/controller/magnetic-ctrl';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
    title = 'ng-magnetic-app';

    magneticOptions: MagneticOptions = {
        vDelta: 0.2,
        hDelta: 0.2,
        speed: 0.2,
        releaseSpeed: 0.7
    }

    ngAfterViewInit(): void {
    }
}
