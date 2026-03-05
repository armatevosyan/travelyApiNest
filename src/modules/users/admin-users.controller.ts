import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorators';
import { ERoles } from '@/modules/roles/role.types';
import { I18nService } from 'nestjs-i18n';
import { DeactivateUserDto } from './user.dto';

/** Query params for admin user list */
interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
}

@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ERoles.ADMIN, ERoles.SUPER_ADMIN)
export class AdminUsersController {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  async findAll(@Query() query: AdminUsersQuery) {
    const { data, total } = await this.userService.findAllForAdmin({
      page: query.page,
      limit: query.limit,
      search: query.search,
      sort: query.sort,
      order: query.order as 'ASC' | 'DESC' | undefined,
    });
    return {
      message: this.i18n.translate('t.USERS_RETRIEVED_SUCCESSFULLY'),
      data,
      total,
    };
  }

  @Patch(':id/deactivate')
  async deactivate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: DeactivateUserDto,
  ) {
    await this.userService.deactivateUser(id, body.reason);
    return {
      message: this.i18n.translate('t.USER_DEACTIVATED_SUCCESSFULLY'),
    };
  }

  @Patch(':id/activate')
  async activate(@Param('id', ParseIntPipe) id: number) {
    await this.userService.activateUser(id);
    return {
      message: this.i18n.translate('t.USER_ACTIVATED_SUCCESSFULLY'),
    };
  }
}
