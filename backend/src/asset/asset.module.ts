import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@tiktok-clone/share/entities';
import { AssetService } from './asset.service';
import { UploadService } from './upload.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Asset])
    ],
    providers: [
        AssetService,
        UploadService,
    ],
    exports: [
        AssetService,
        UploadService,
    ]
})
export class AssetModule { }
