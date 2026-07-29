import { prisma } from "@/lib/prisma";
import type { NpmPackageResponse } from "@/types/npm";
import { normalizeNpmPackage } from "@/lib/utils/npm";

type FindAllOptions = {
  q?: string;
  page: number;
  limit: number;
};

type CreatePackageOptions = {
  name: string;
  description?: string;
  versions?: string[];
};

export const packageRepository = {
  async findAll(options: FindAllOptions) {
    const where = {
      name: {
        contains: options.q ?? "",
        mode: "insensitive" as const,
      },
    };

    const [total, packages] = await Promise.all([
      prisma.package.count({
        where,
      }),

      prisma.package.findMany({
        where,

        skip: (options.page - 1) * options.limit,

        take: options.limit,

        orderBy: {
          id: "desc",
        },

        include: {
          versions: true,
        },
      }),
    ]);

    return {
      data: packages,

      total,

      page: options.page,

      limit: options.limit,

      totalPages: Math.ceil(total / options.limit),
    };
  },

  async findById(id: number) {
    return prisma.package.findUnique({
      where: {
        id,
      },

      include: {
        versions: true,
      },
    });
  },
  async findByName(name: string) {
    return prisma.package.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },

      include: {
        versions: true,
        trustSignal: true,
        analysisRuns: true,
      },
    });
  },

  async create(data: CreatePackageOptions) {
    return prisma.package.create({
      data: {
        name: data.name,

        description: data.description,

        versions: {
          create:
            data.versions?.map((version) => ({
              version,
            })) ?? [],
        },
      },

      include: {
        versions: true,
      },
    });
  },

  async saveFromNpm(data: NpmPackageResponse) {
    const normalized = normalizeNpmPackage(data);
    return prisma.package.create({
      data: {
        name: normalized.name,
        description: normalized.description,

        versions: {
          create: normalized.versions.map((version) => ({
            version,
          })),
        },

        trustSignal: {
          create: {
            maintainers: normalized.maintainers,
          },
        },

        analysisRuns: {
          create: {
            score: null,
            status: "pending",
          },
        },
      },

      include: {
        versions: true,
        trustSignal: true,
        analysisRuns: true,
      },
    });
  },
};
