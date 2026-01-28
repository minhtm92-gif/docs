import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ProductStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateProductInput {
  code: string;
  name: string;
  status?: ProductStatus;
}

export interface UpdateProductInput {
  code?: string;
  name?: string;
  status?: ProductStatus;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(orgId: string) {
    return this.prisma.product.findMany({
      where: { org_id: orgId },
      orderBy: { name: 'asc' },
    });
  }

  async create(orgId: string, input: CreateProductInput) {
    return this.prisma.product.create({
      data: {
        org_id: orgId,
        code: input.code,
        name: input.name,
        status: input.status ?? ProductStatus.ACTIVE,
      },
    });
  }

  async update(orgId: string, id: string, input: UpdateProductInput) {
    const existing = await this.prisma.product.findFirst({
      where: { id, org_id: orgId },
    });

    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    const data: Prisma.productUpdateInput = {
      ...(input.code ? { code: input.code } : {}),
      ...(input.name ? { name: input.name } : {}),
      ...(input.status ? { status: input.status } : {}),
    };

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
