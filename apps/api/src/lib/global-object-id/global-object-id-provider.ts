export interface IGlobalIDProvider {
  /**
   * Take plain text and return encoded string.
   */
  encode(input: string): string;
  /**
   * Take encoded string and return plain text.
   */
  decode(input: string): string;
}
