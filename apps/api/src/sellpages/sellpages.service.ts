import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SellpageDeliveryType, SellpageStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateSellpageInput {
  productId: string;
  name: string;
  pixelId?: string;
}

export interface UpdateSellpageInput {
  name?: string;
  pixelId?: string;
  status?: SellpageStatus;
}

export interface UpdateSellpageContentInput {
  domain: string;
  path: string;
}

@Injectable()
export class SellpagesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(orgId: string) {
    return this.prisma.sellpage.findMany({
      where: { org_id: orgId },
      include: { deliveries: true },
      orderBy: { name: 'asc' },
    });
  }

  async create(orgId: string, input: CreateSellpageInput) {
    const product = await this.prisma.product.findFirst({
      where: { id: input.productId, org_id: orgId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.sellpage.create({
      data: {
        org_id: orgId,
        product_id: input.productId,
        name: input.name,
        version: 1,
        pixel_id: input.pixelId,
        status: SellpageStatus.DRAFT,
      },
    });
  }

  async update(orgId: string, id: string, input: UpdateSellpageInput) {
    const sellpage = await this.prisma.sellpage.findFirst({
      where: { id, org_id: orgId },
    });

    if (!sellpage) {
      throw new NotFoundException('Sellpage not found');
    }

    const data: Prisma.sellpageUpdateInput = {
      ...(input.name ? { name: input.name } : {}),
      ...(input.pixelId ? { pixel_id: input.pixelId } : {}),
      ...(input.status ? { status: input.status } : {}),
    };

    return this.prisma.sellpage.update({
      where: { id },
      data,
    });
  }

  async updateContent(orgId: string, id: string, input: UpdateSellpageContentInput) {
    const sellpage = await this.prisma.sellpage.findFirst({
      where: { id, org_id: orgId },
      include: { deliveries: true },
    });

    if (!sellpage) {
      throw new NotFoundException('Sellpage not found');
    }

    const publicUrl = this.buildPublicUrl(input.domain, input.path);
    const existing = sellpage.deliveries.find(
      (delivery) => delivery.type === SellpageDeliveryType.ONEPAGE,
    );

    if (existing) {
      return this.prisma.sellpage_delivery.update({
        where: { id: existing.id },
        data: {
          domain: input.domain,
          path: input.path,
          public_url: publicUrl,
          status: SellpageStatus.DRAFT,
        },
      });
    }

    return this.prisma.sellpage_delivery.create({
      data: {
        sellpage_id: sellpage.id,
        type: SellpageDeliveryType.ONEPAGE,
        domain: input.domain,
        path: input.path,
        public_url: publicUrl,
        status: SellpageStatus.DRAFT,
      },
    });
  }

  async publish(orgId: string, id: string) {
    const sellpage = await this.prisma.sellpage.findFirst({
      where: { id, org_id: orgId },
      include: { deliveries: true },
    });

    if (!sellpage) {
      throw new NotFoundException('Sellpage not found');
    }

    const delivery = sellpage.deliveries.find(
      (item) => item.type === SellpageDeliveryType.ONEPAGE,
    );

    if (!delivery) {
      throw new BadRequestException('Sellpage delivery must be configured before publish');
    }

    await this.prisma.sellpage_delivery.update({
      where: { id: delivery.id },
      data: {
        status: SellpageStatus.PUBLISHED,
        public_url: this.buildPublicUrl(delivery.domain, delivery.path),
      },
    });

    return this.prisma.sellpage.update({
      where: { id },
      data: { status: SellpageStatus.PUBLISHED },
    });
  }

  private buildPublicUrl(domain: string, path: string) {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const trimmedDomain = domain.replace(/\/$/, '');
    return `https://${trimmedDomain}/${normalizedPath}`;
  }
}
