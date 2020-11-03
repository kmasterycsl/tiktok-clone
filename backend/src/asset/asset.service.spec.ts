import { AssetService } from './asset.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Asset } from '@simple-tiktok/share/entities';
import { Repository } from 'typeorm';
import { mockProvideForRepository } from '@test/utils';

describe('AssetServiceTest', () => {
    let assetService: AssetService;
    let assetRepo: Repository<Asset>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AssetService,
                mockProvideForRepository(Asset),
            ],
        }).compile();
        assetService = moduleRef.get<AssetService>(AssetService);
        assetRepo = moduleRef.get<Repository<Asset>>(getRepositoryToken(Asset));
    });

    it('i should saveAsset', async () => {
        jest.spyOn(assetRepo, 'save');

        await assetService.saveAsset({
            file_extension: '',
            file_mime: '',
            file_name: '',
            file_relative_path: '',
            title: '',
            user_id: 0,
        });

        expect(assetRepo.save).toBeCalled();
    });
});