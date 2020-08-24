import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Asset } from "src/entities/asset.entity";

const songs = [1, 2, 3].map(num => ({
    id: num,
    file_extension: 'mp3',
    file_name: num + '.mp3',
    file_mime: 'audio/mpeg',
    file_relative_path: '/songs',
    user_id: 1,
    title: 'Song ' + num,
}));

const videos = [101, 102, 103].map(num => ({
    id: num,
    file_extension: 'mp4',
    file_name: num + '.mp4',
    file_mime: 'video/mp4',
    file_relative_path: '/videos',
    user_id: 1,
    title: 'Video ' + num,
}));

const assets: Partial<Asset>[] = [...songs, ...videos];

export class AssetSeeding1597876101233 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(Asset).save(
            assets
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
