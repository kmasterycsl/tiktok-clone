import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Comment, Like, Tag, TagTweet, Tweet } from '@simple-tiktok/share';
import { User } from '@simple-tiktok/share/entities';

export const mockProvideForRepository = (entity: EntityClassOrSchema) => {
    return {
        provide: getRepositoryToken(entity),
        useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOneOrFail: jest.fn().mockResolvedValue(true),
            findOne: jest.fn().mockResolvedValue(true),
            create: jest.fn().mockReturnValue(true),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
        },
    };
};

export const mockProviderForAllRepositories = [
    Like,
    Tweet,
    TagTweet,
    Comment,
    User,
    Tag,
].map(mockProvideForRepository)