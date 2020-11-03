import { Test } from '@nestjs/testing';
import { Tag } from '@simple-tiktok/share';
import { TweetService } from 'src/tweet/tweet.service';
import { TagService } from 'src/tag/tag.service';
import { Repository } from 'typeorm';
import { mockProviderForAllRepositories } from '@test/utils';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TagServiceTest', () => {
    let tagService: TagService;
    let tagRepo: Repository<Tag>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ...mockProviderForAllRepositories,
                TweetService,
                TagService,
            ],
        }).compile();
        tagService = moduleRef.get<TagService>(TagService);
        tagRepo = moduleRef.get<Repository<Tag>>(getRepositoryToken(Tag));
    });

    it('it should return tag', async () => {
        const tag = new Tag();
        jest.spyOn(tagRepo, 'findOne').mockReturnValue(Promise.resolve(tag));
        await expect(tagService.getTag(1)).resolves.toBe(tag);
        expect(tagRepo.findOne).toBeCalledWith(1);
    });

    it('it should get or create slugs', async () => {
        const creatorId = 90;
        const slugs = {
            'existed-slug-1': new Tag(),
            'existed-slug-2': new Tag(),
            'existed-slug-3': new Tag(),
            'new-slug-1': new Tag(),
            'new-slug-2': new Tag(),
            'new-slug-3': new Tag(),
        };

        jest.spyOn(tagRepo, 'findOne')
            .mockResolvedValueOnce(slugs['existed-slug-1'])
            .mockResolvedValueOnce(slugs['existed-slug-2'])
            .mockResolvedValueOnce(slugs['existed-slug-3'])
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce(undefined);

        jest.spyOn(tagRepo, 'save')
            .mockResolvedValueOnce(slugs['new-slug-1'])
            .mockResolvedValueOnce(slugs['new-slug-2'])
            .mockResolvedValueOnce(slugs['new-slug-3']);

        const results = await tagService.getOrCreateTagsFromSlugs(Object.keys(slugs), creatorId);

        expect(results.length).toEqual(6);
        expect(results).toEqual(expect.arrayContaining([
            slugs['existed-slug-1'],
            slugs['existed-slug-2'],
            slugs['existed-slug-3'],
            slugs['new-slug-1'],
            slugs['new-slug-2'],
            slugs['new-slug-3'],
        ]));

        expect(tagRepo.save).toHaveBeenNthCalledWith(1, {
            slug: 'new-slug-1',
            description: '',
            created_user_id: creatorId,
            total_likes: 0,
        });

        expect(tagRepo.save).toHaveBeenNthCalledWith(2, {
            slug: 'new-slug-2',
            description: '',
            created_user_id: creatorId,
            total_likes: 0,
        });

        expect(tagRepo.save).toHaveBeenNthCalledWith(3, {
            slug: 'new-slug-3',
            description: '',
            created_user_id: creatorId,
            total_likes: 0,
        });
    });
});