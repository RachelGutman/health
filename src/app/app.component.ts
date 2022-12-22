import { Component } from '@angular/core';

// import { HealthKit } from '@awesome-cordova-plugins/health-kit/ngx';
import { Health } from '@awesome-cordova-plugins/health/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HealthProj';
  constructor( private health: Health){}
  d: boolean = false;
  c: boolean = false;
  res: any;
  available: any;
  authorize: any;
  querytype: string = '';

  ngOnInit(): void {
    //environment.SHA1
    // this.healthKit.available().then((a) => {
    //   this.d = true;
    //   console.log('a');
    //   console.log(a);
    //   this.healthKit.readGender().then((b) => {
    //     this.c = true;
    //     console.log('b');
    //     console.log(b);
    //   });
    // });

    this.androidAndIOS();
  }

  androidAndIOS(type: string = '') {
    this.health
      .isAvailable()
      .then((available: boolean) => {
        console.log('available');
        console.log(available);
        this.available = available;
        let read = ['steps', 'height'];
        if (type) {
          read.push(type);
        }
        this.health
          .requestAuthorization([
            'distance',
            'nutrition', //read and write permissions
            {
              read: read, //read only permission
              write: ['height', 'weight'], //write only permission
            },
          ])
          .then((res) => {
            console.log('res');
            console.log(res);
            this.authorize = res;
            this.health
              .query({
                startDate: new Date(
                  new Date().getTime() - 300 * 24 * 60 * 60 * 1000
                ), // three days ago
                endDate: new Date(), // now
                dataType: type || 'height',
                limit: 1000,
              })
              .then((a) => {
                console.info('query');
                console.info(a);
                this.res = a;
              })
              .catch((a) => {
                console.error('err');
                console.error(a);
              });
          })
          .catch((e) => {
            //User cancelled the dialog
            console.log('err');
            console.log(e);
          });
      })
      .catch((e) => console.log(e));
  }

  getValue() {
    debugger;
    console.log(this.querytype);
    this.androidAndIOS(this.querytype);
  }

}
