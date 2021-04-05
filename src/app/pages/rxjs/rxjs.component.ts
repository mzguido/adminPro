import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

// Este import genera un error desde el la actualizacion de mi PC
// import { info } from 'node:console';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  //
  public intervalSub: Subscription;
  constructor() {
    {
      //
      // this.returnObservable()
      //   .pipe(retry(1))
      //   .subscribe(
      //     // next
      //     (resp) => console.log('Subs:', resp),
      //     // error
      //     (err) => console.warn('Error:', err),
      //     // complete
      //     () => console.info('Observable terminado')
      //   );
      // this.returnInterval().subscribe((resp) => {
      //   console.log(resp);
      // });
    }
    // estoe s quivalente a las lineas de arriba
    this.intervalSub = this.returnInterval().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
    console.log('Componente rxjs destruido');
  }

  ngOnInit(): void {}

  returnInterval(): Observable<number> {
    {
      // const interval$ = interval(1000).pipe(
      //   take(6),
      //   map((valor) => 'hello world ' + (valor + 1))
      // );
      // return interval$;
      // return interval(500).pipe(
      //   take(10),
      //   map((valor) => 'hello world ' + (valor + 1))
      // );
    }
    // lo mismo que las lineas anteriores pero sumando filter
    return interval(300).pipe(
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
      // take(10)
    );
  }

  returnObservable(): Observable<number> {
    let i = 0;

    return new Observable<number>((observer) => {
      //
      const interval = setInterval(() => {
        //
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Something goes wrong!!');
        }
      }, 1000);
    });
  }
}
