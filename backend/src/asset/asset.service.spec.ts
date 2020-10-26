import { AssetService } from './asset.service';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@tiktok-clone/share/entities';
import { getRepository } from 'typeorm';

describe('AssetServiceTest', () => {
  let assetService: AssetService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Asset]),
      ],
      providers: [
        AssetService,
      ],
    }).compile();
    assetService = moduleRef.get<AssetService>(AssetService);
  });

  it('i should saveAsset', async () => {
    const repo = getRepository(Asset);
    jest.spyOn(getRepository(Asset), 'save').mockImplementation(() => undefined);

    await assetService.saveAsset({
      file_extension: '',
      file_mime: '',
      file_name: '',
      file_relative_path: '',
      title: '',
      user_id: 0,
    });

    expect(repo.save).toBeCalled();
  });
});