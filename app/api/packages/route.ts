import { PackageSchema } from "@/lib/validations/package";
import { packageRepository } from "@/repositories/package.repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q") ?? "";

  const page = Number(searchParams.get("page") ?? "1");

  const limit = Number(searchParams.get("limit") ?? "10");

  const packages = await packageRepository.findAll({
    q,
    page,
    limit,
  });

  return Response.json(packages);
}

export async function POST(request: Request) {
  const body = await request.json();

  const result = PackageSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: result.error.flatten(),
      },
      {
        status: 400,
      },
    );
  }

  const info = await packageRepository.create(result.data);

  return Response.json(info, {
    status: 201,
  });
}
