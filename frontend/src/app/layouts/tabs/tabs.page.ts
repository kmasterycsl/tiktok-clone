import { Component, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    @ViewChild('tabs') tabs: IonTabs;

    constructor(
        private navCtrl: NavController,
    ) {
    }

    async openTab(tab: string, evt: MouseEvent) {
        const tabSelected = this.tabs.getSelected();
        evt.stopImmediatePropagation();
        evt.preventDefault();
        return tabSelected !== tab
            ? await this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
            : this.tabs.select(tab);
    }
}
