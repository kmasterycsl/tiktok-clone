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
exports.Asset = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const user_entity_1 = require("./user.entity");
let Asset = class Asset extends common_entity_1.CommonEntity {
    constructor() {
        super();
    }
    setExtraInfo() {
        this.file_url = `${process.env.API_URL}:${process.env.API_PORT}/${this.file_relative_path}/${this.file_name}`;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Asset.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Asset.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Asset.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Asset.prototype, "file_mime", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Asset.prototype, "file_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Asset.prototype, "file_extension", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Asset.prototype, "file_relative_path", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.assets),
    typeorm_1.JoinColumn({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Asset.prototype, "user", void 0);
Asset = __decorate([
    typeorm_1.Entity({
        name: 'assets'
    }),
    __metadata("design:paramtypes", [])
], Asset);
exports.Asset = Asset;
//# sourceMappingURL=asset.entity.js.map