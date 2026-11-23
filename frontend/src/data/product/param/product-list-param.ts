export default class ProductListParam {
  private readonly search?: string;

  constructor(search?: string) {
    this.search = search?.trim() || undefined;
  }

  toQueryString(): string {
    const params = new URLSearchParams();
    if (this.search) {
      params.set("search", this.search);
    }
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  }
}
