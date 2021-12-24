import { Component } from '@angular/core';
import { MagneticOptions } from 'projects/ng-magnetic/src/lib/controller/magnetic-ctrl';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ng-magnetic-app';

    magneticOptions: MagneticOptions = {
        vDelta: 0.8,
        hDelta: 0.8,
        speed: 0.4,
        releaseSpeed: 1
    }
}
