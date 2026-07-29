import { packageRepository } from "@/repositories/package.repository";
import { npmService } from "@/services/npm.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q");

  if (!q) {
    return Response.json(
      {
        error: "Query is required",
      },
      {
        status: 400,
      },
    );
  }

  // ابتدا داخل دیتابیس جستجو کن
  const existingPackage = await packageRepository.findByName(q);

  if (existingPackage) {
    return Response.json(existingPackage);
  }

  // اگر نبود از npm دریافت کن
  const npmPackage = await npmService.getPackage(q);

  // داخل دیتابیس ذخیره کن
  const savedPackage = await packageRepository.saveFromNpm(npmPackage);

  return Response.json(savedPackage);
}
