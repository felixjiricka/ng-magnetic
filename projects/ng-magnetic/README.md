<h1>Welcome to @wecodeit/ng-magnetic 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/Version-2.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Angular Wrapper of michaelgudzevskyi/cursor-hover-effect-gsap for a custom cursor and magnetic cursor effect.

### 🏠 [Homepage](https://github.com/felixjiricka/ng-magnetic)

### ✨ [Demo](https://felixjiricka.github.io/ng-magnetic/)

## Install

```sh
npm install @wecodeit/ng-magnetic
```

## Usage
Import the ```NgMagneticModule``` and ```NgCursorModule``` in your app.module.ts:

```ts
import { NgMagneticModule, NgCursorModule } from 'ng-magnetic';

@NgModule({
  imports: [
    BrowserModule,
    NgMagneticModule,
    NgCursorModule
  ],
})
export class AppModule { }
```

####Magnetic Effect
To apply the magnetic effect, simply add the ```ngMagnetic``` directive to your element:

```html
<div class="cb-demo-item" ngMagnetic [options]="magneticOptions">
    <div class="cb-demo-item-title">Magnetic</div>
        <div class="cb-demo-item-text">
            Magnetic via [data-magnetic] attribute
        </div>
    </div>
</div>
```

###### Inputs
```typescript
  /** options of ngMagnetic effect */
  @Input() options: MagneticOptions = {
      hDelta: 0.2, // horizontal delta
      vDelta: 0.2, // vertical delta,
      speed: 0.2, // speed
      releaseSpeed: //release Speed
  };
```

####Custom Cursor

Use the ng-cursor component inside your main component for example ```app.component.html```:
If you use a smooth-scroll library which uses translate, make sure to place the cursor outside of the transformed element.

```html
<router-outlet></router-outlet>
<ng-cursor></ng-cursor>
```

To modify your cursor, simply use the following attributes:
```html
    <!--  add size class xl or lg-->
    <div data-cursor="-xl"></div>

    <!--  add opaque effect to the cursor -->
    <div data-cursor="-opaque"></div>

     <!-- you can also use multiple styles at once -->
    <div data-cursor="-xl -opaque"></div>

    <!-- set image of cursor -->
    <div data-cursor-image="https://picsum.photos/200/300"></div>

     <!-- set cursor text -->
    <div data-cursor-text="Hello!"></div>

    <!-- use sticky effect -->
    <div data-cursor="-exclusion -lg" data-cursor-stick="#cursor-stick-area">
        <div class="cb-demo-item-title" id="cursor-stick-area">
            Sticky
        </div>
    </div>
```

###### Inputs
```typescript
  /** options of the cursor */
  @Input() options: CursorOptions = {
      speed: 0.7,
      ease: 'expo.out',
      visibleTimeout: 300,
  };
```

## Author

👤 **Felix Jiricka**

* Website: www.wecodeit.dev
* Github: [@felixjiricka](https://github.com/felixjiricka)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/felixjiricka/ng-magnetic/issues). 

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
