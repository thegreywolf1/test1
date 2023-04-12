import { Component, NgZone, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LinkItem, isDefined } from '@slb-dls/angular-material/shared';
import { SlbNotificationItem } from '@slb-dls/angular-material/notifications-panel';
declare const require: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy {
    title = 'shell';
    ngVersion = require('../../../../package.json').dependencies['@angular/core'];

    notificationCount: number =  10;
    notificationItems: SlbNotificationItem[] = [];

    showHeader: boolean = true;
    pageTitle: string = '';
    secondaryLinks: LinkItem[] = [];

    private routerSubscription = Subscription.EMPTY;

    constructor(
        private ngZone: NgZone,
        router: Router,
        matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg-symbols.svg'));

        this.routerSubscription = router.events.pipe(
            filter(e => e instanceof RoutesRecognized),
            map(e => e as RoutesRecognized))
        .subscribe(e => this.onRouteChange(e));
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    private onRouteChange(event: RoutesRecognized): void {
        const data: any = event.state.root.firstChild?.data;
        this.showHeader = isDefined(data.showHeader) ? data.showHeader : true;
        this.pageTitle = data.title;
        this.secondaryLinks = data.links;
    }
}
