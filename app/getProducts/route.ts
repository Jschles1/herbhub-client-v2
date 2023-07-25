import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { Prisma, Product } from '@prisma/client';
import { ProductPrice } from '@/lib/interfaces';

export const revalidate = false;

const generateFilterWhereInput = (
  param: string,
  whereInput: Prisma.ProductWhereInput
) => {
  const paramSplit = param.split('/');
  const paramType = paramSplit[0];
  let paramValue = paramSplit[1];

  if (paramType === 'loc') {
    const index = paramValue.indexOf('-');
    paramValue = paramValue
      .split('')
      .splice(index)
      .join('')
      .replace(/-/g, ' ')
      .trim();
  }

  if (paramType === 'br') {
    paramValue = paramValue.replace(/-/g, ' ').trim();
  }

  switch (paramType) {
    case 'loc':
      whereInput.dispensaryLocation = {
        equals: paramValue,
        mode: 'insensitive',
      };
      break;
    case 'br':
      whereInput.brand = {
        equals: paramValue,
        mode: 'insensitive',
      };
      break;
    case 'type':
      whereInput.categoryType = {
        equals: paramValue,
        mode: 'insensitive',
      };
      break;
    case 'str':
      whereInput.strainType = {
        equals: paramValue,
        mode: 'insensitive',
      };
      break;
    default:
      break;
  }
};

// For separating promotion products from regular in price sorting
const sortByPromotionProducts = (products: Product[]) => {
  return products.sort((a, b) => {
    const aPriceObj = (a.prices as unknown as ProductPrice[])[0];
    const bPriceObj = (b.prices as unknown as ProductPrice[])[0];
    const aPromoPrice = aPriceObj?.promo_price || 0;
    const bPromoPrice = bPriceObj?.promo_price || 0;

    if (aPromoPrice && bPromoPrice) {
      return 0;
    } else if (aPromoPrice && !bPromoPrice) {
      return -1;
    } else if (!aPromoPrice && bPromoPrice) {
      return 1;
    } else {
      return 0;
    }
  });
};

const getAveragePrices = (a: Product, b: Product) => {
  if (a && b) {
    const aPrice: number = (a as any).price;
    const bPrice: number = (b as any).price;
    const aPromoPrice = (a as any).promoPrice;
    const bPromoPrice = (b as any).promoPrice;
    if (aPrice && bPrice && aPromoPrice && bPromoPrice) {
      let aAveragePrice;
      let bAveragePrice;

      const aPrices = (Object.values(aPrice) as any).filter(
        (pr: any) => typeof pr === 'number'
      );
      const bPrices = (Object.values(bPrice) as any).filter(
        (pr: any) => typeof pr === 'number'
      );
      const aPromoPrices = (Object.values(aPromoPrice) as any).filter(
        (pr: any) => typeof pr === 'number' && pr > 0
      );
      const bPromoPrices = (Object.values(bPromoPrice) as any).filter(
        (pr: any) => typeof pr === 'number' && pr > 0
      );

      if (aPromoPrices.length && bPromoPrices.length) {
        if (aPromoPrices.length > 1) {
          aAveragePrice =
            aPromoPrices.reduce((a: number, b: number) => a + b, 0) /
            aPromoPrices.length;
        } else {
          aAveragePrice = aPromoPrices[0];
        }
        if (bPromoPrices.length > 1) {
          bAveragePrice =
            bPromoPrices.reduce((a: number, b: number) => a + b, 0) /
            bPromoPrices.length;
        } else {
          bAveragePrice = bPromoPrices[0];
        }
      } else if (!aPromoPrices.length && bPromoPrices.length) {
        if (aPrices.length > 1) {
          aAveragePrice =
            aPrices.reduce((a: number, b: number) => a + b, 0) / aPrices.length;
        } else {
          aAveragePrice = aPrices[0];
        }
        if (bPromoPrices.length > 1) {
          bAveragePrice =
            bPromoPrices.reduce((a: number, b: number) => a + b, 0) /
            bPromoPrices.length;
        } else {
          bAveragePrice = bPromoPrices[0];
        }
      } else if (aPromoPrices.length && !bPromoPrices.length) {
        if (aPromoPrices.length > 1) {
          aAveragePrice =
            aPromoPrices.reduce((a: number, b: number) => a + b, 0) /
            aPromoPrices.length;
        } else {
          aAveragePrice = aPromoPrices[0];
        }
        if (aPrices.length > 1) {
          aAveragePrice =
            aPrices.reduce((a: number, b: number) => a + b, 0) / aPrices.length;
        } else {
          aAveragePrice = aPrices[0];
        }
      } else {
        if (aPrices.length > 1) {
          aAveragePrice =
            aPrices.reduce((a: number, b: number) => a + b, 0) / aPrices.length;
        } else {
          aAveragePrice = aPrices[0];
        }
        if (bPrices.length > 1) {
          bAveragePrice =
            bPrices.reduce((a: number, b: number) => a + b, 0) / bPrices.length;
        } else {
          bAveragePrice = bPrices[0];
        }
      }
      return { aAveragePrice, bAveragePrice };
    }
  }

  return { aAveragePrice: 0, bAveragePrice: 0 };
};

const prisma = new PrismaClient();

interface ProductQuery extends URLSearchParams {
  search?: string;
  filter?: string;
  sortBy?: string;
}

export async function GET(request: NextRequest) {
  console.log('3. GET PRODUCTS ROUTE');
  const query: ProductQuery = request.nextUrl.searchParams;

  console.log('4. GET PRODUCTS PARAMS', query);

  try {
    await prisma.$connect();

    const whereInput: Prisma.ProductWhereInput = {};
    const orderByInputs: Prisma.ProductOrderByWithRelationInput[] = [];

    if (query.search) {
      whereInput.strain = {
        contains: query.search as string,
        mode: 'insensitive',
      };
    }

    if (query.filter) {
      if (query.filter.includes(',')) {
        const filterSplit = (query.filter as string).split(',');
        for (const filterParam of filterSplit) {
          generateFilterWhereInput(filterParam, whereInput);
        }
      } else {
        generateFilterWhereInput(query.filter as string, whereInput);
      }
    }

    if (query.sortBy) {
      switch (query.sortBy) {
        case 'alphabetical':
          const input: Prisma.ProductOrderByWithRelationInput = {
            strain: 'asc',
          };
          orderByInputs.push(input);
          break;
        case 'thc-low-to-high':
        case 'thc-high-to-low':
          whereInput.thc = { not: 0 };
        case 'cbd-low-to-high':
        case 'cbd-high-to-low':
          whereInput.cbd = { not: 0 };
        default:
          break;
      }
    }

    let products = await prisma.product.findMany({
      take: 24,
      where: whereInput,
      orderBy: orderByInputs,
    });

    if (query.sortBy === 'thc-low-to-high') {
      products = products.sort((a, b) => (a.thc as number) - (b.thc as number));
    }

    if (query.sortBy === 'thc-high-to-low') {
      products = products.sort((a, b) => (b.thc as number) - (a.thc as number));
    }

    if (query.sortBy === 'cbd-low-to-high') {
      products = products.sort((a, b) => (a.cbd as number) - (b.cbd as number));
    }

    if (query.sortBy === 'cbd-high-to-low') {
      products = products.sort((a, b) => (b.cbd as number) - (a.cbd as number));
    }

    if (query.sortBy === 'price-low-to-high') {
      products = sortByPromotionProducts(products).sort((a, b) => {
        const { aAveragePrice, bAveragePrice } = getAveragePrices(a, b);
        return aAveragePrice - bAveragePrice;
      });
    }

    if (query.sortBy === 'price-high-to-low') {
      products = sortByPromotionProducts(products).sort((a, b) => {
        const { aAveragePrice, bAveragePrice } = getAveragePrices(a, b);
        return bAveragePrice - aAveragePrice;
      });
    }

    await prisma.$disconnect();

    return NextResponse.json(
      {
        products,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
