import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post, Put } from '@nestjs/common';
import {
  CreateSellpageInput,
  SellpagesService,
  UpdateSellpageContentInput,
  UpdateSellpageInput,
} from './sellpages.service';

@Controller('sellpages')
export class SellpagesController {
  constructor(private readonly sellpagesService: SellpagesService) {}

  @Get()
  async list(@Headers('x-org-id') orgId?: string) {
    return this.sellpagesService.list(this.requireOrgId(orgId));
  }

  @Post()
  async create(
    @Headers('x-org-id') orgId: string | undefined,
    @Body() body: CreateSellpageInput,
  ) {
    return this.sellpagesService.create(this.requireOrgId(orgId), body);
  }

  @Patch(':id')
  async update(
    @Headers('x-org-id') orgId: string | undefined,
    @Param('id') id: string,
    @Body() body: UpdateSellpageInput,
  ) {
    return this.sellpagesService.update(this.requireOrgId(orgId), id, body);
  }

  @Put(':id/content')
  async updateContent(
    @Headers('x-org-id') orgId: string | undefined,
    @Param('id') id: string,
    @Body() body: UpdateSellpageContentInput,
  ) {
    return this.sellpagesService.updateContent(this.requireOrgId(orgId), id, body);
  }

  @Post(':id/publish')
  async publish(
    @Headers('x-org-id') orgId: string | undefined,
    @Param('id') id: string,
  ) {
    return this.sellpagesService.publish(this.requireOrgId(orgId), id);
  }

  private requireOrgId(orgId?: string) {
    if (!orgId) {
      throw new BadRequestException('Missing x-org-id header');
    }
    return orgId;
  }
}
