import { CreateBlogDto } from './create-blog.dto';

describe('CreateBlogDto', () => {
  it('should be defined', () => {
    expect(new CreateBlogDto()).toBeDefined();
  });
});
