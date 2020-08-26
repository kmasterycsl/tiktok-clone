export interface IPaginationOptions {
    limit: number;
    page: number;
    route?: string;
}
export interface IPaginationMeta {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
export interface IPaginationLinks {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
}
export declare class Pagination<PaginationObject> {
    readonly items: PaginationObject[];
    readonly meta: IPaginationMeta;
    readonly links: IPaginationLinks;
    constructor(items: PaginationObject[], meta: IPaginationMeta, links: IPaginationLinks);
}
