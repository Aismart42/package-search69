export const npmService = {
  async getPackage(name: string) {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`);

    if (!response.ok) {
      throw new Error("Package not found");
    }

    return response.json();
  },
};
