"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const user_entity_1 = require("./user.entity");
const asset_entity_1 = require("./asset.entity");
let Tweet = class Tweet extends common_entity_1.CommonEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Tweet.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Tweet.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Tweet.prototype, "song_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Tweet.prototype, "video_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tweet.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.tweets),
    typeorm_1.JoinColumn({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Tweet.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => asset_entity_1.Asset, asset => asset.associated_objects),
    typeorm_1.JoinColumn({ name: "song_id" }),
    __metadata("design:type", asset_entity_1.Asset)
], Tweet.prototype, "song", void 0);
__decorate([
    typeorm_1.ManyToOne(type => asset_entity_1.Asset, user => user.associated_objects),
    typeorm_1.JoinColumn({ name: "video_id" }),
    __metadata("design:type", asset_entity_1.Asset)
], Tweet.prototype, "video", void 0);
Tweet = __decorate([
    typeorm_1.Entity({
        name: 'tweets'
    })
], Tweet);
exports.Tweet = Tweet;
//# sourceMappingURL=tweet.entity.js.map