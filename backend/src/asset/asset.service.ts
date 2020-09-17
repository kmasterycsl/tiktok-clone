
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { Asset, User } from '@tiktok-clone/share/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface IStoreAssetParams {
  user_id: number;
  thumbnail_id?: number;
  title: string;
  file_mime: string;
  file_name: string;
  file_extension: string;
  file_relative_path: string;
}

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) { }

  saveAsset(params: IStoreAssetParams): Promise<Asset> {
    const asset: Partial<Asset> = {
      ...params,
    }

    return this.assetRepository.save(asset);
  }

}
