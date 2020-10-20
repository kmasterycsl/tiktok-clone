import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TagService } from '../../tag.service';
import { Pagination, Tag } from '@tiktok-clone/share';
import { ROUTE_TAG_DETAIL_PAGE } from 'src/app/shared/consts';

@Component({
    selector: 'tiktok-tag-list',
    templateUrl: './tag-list.page.html',
    styleUrls: ['./tag-list.page.scss'],
})
export class TagListPage implements OnInit {
    currentResponse: Pagination<Tag> = null;
    tags: Tag[] = [];
    title: string;

    constructor(
        private tagService: TagService,
        private navController: NavController,
    ) {
    }

    ngOnInit() {
        this.title = 'Trending';
        this.loadTags(1);
    }

    loadTags(page: number) {
        return this.tagService.getTags(page).toPromise().then(response => {
            this.currentResponse = response;
            this.tags = [
                ...this.tags,
                ...response.items
            ];
            return response;
        });
    }

    loadMore(event) {
        return this.loadTags(+this.currentResponse.meta.currentPage + 1).then(response => {
            event.target.complete();
            if (+response.meta.currentPage === +response.meta.totalPages) {
                event.target.disabled = true;
            }
        });
    }

    goToDetail(tag: Tag) {
        this.navController.navigateForward([ROUTE_TAG_DETAIL_PAGE(tag.id)]);
    }

}
