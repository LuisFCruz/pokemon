export class InvalidGenerationError extends Error {
  constructor(generation: string | number) {
    super(
      `Invalid generation param: '${generation}'. Must be a non-empty string or positive integer.`,
    );
    this.name = "InvalidGenerationError";
  }
}
