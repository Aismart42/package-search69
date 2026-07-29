import { packageRepository } from "@/repositories/package.repository";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;

  const packageId = Number(id);

  if (Number.isNaN(packageId)) {
    return Response.json(
      {
        error: "Invalid package id",
      },
      {
        status: 400,
      },
    );
  }

  const pkg = await packageRepository.findById(packageId);

  if (!pkg) {
    return Response.json(
      {
        error: "Package not found",
      },
      {
        status: 404,
      },
    );
  }

  return Response.json(pkg);
}
