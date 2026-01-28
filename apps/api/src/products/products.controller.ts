import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { ProductsService, CreateProductInput, UpdateProductInput } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async list(@Headers('x-org-id') orgId?: string) {
    return this.productsService.list(this.requireOrgId(orgId));
  }

  @Post()
  async create(
    @Headers('x-org-id') orgId: string | undefined,
    @Body() body: CreateProductInput,
  ) {
    return this.productsService.create(this.requireOrgId(orgId), body);
  }

  @Patch(':id')
  async update(
    @Headers('x-org-id') orgId: string | undefined,
    @Param('id') id: string,
    @Body() body: UpdateProductInput,
  ) {
    return this.productsService.update(this.requireOrgId(orgId), id, body);
  }

  private requireOrgId(orgId?: string) {
    if (!orgId) {
      throw new BadRequestException('Missing x-org-id header');
    }
    return orgId;
  }
}
