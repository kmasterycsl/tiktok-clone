import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'tiktok-collapse-text',
    templateUrl: './collapse-text.component.html',
    styleUrls: ['./collapse-text.component.scss'],
})
export class CollapseTextComponent implements OnInit {
    @Input() text: string;
    @Input() line: number = 3;

    style = {};

    showAll;

    constructor() {
    }

    ngOnInit() {
        this.setStyle(false);
    }

    setStyle(showAll: boolean) {
        this.showAll = showAll;
        if (!showAll) {
            this.style = {
                lineHeight: '20px',
                height: (this.line * 20) + 'px',
                overflow: 'hidden',
                position: 'relative',
            };
        } else {
            this.style = {
                position: 'relative'
            };
        }
    }

}
