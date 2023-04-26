export class StringUtil {
  public static isNullOrEmpty(str: string): boolean {
    return str == null || str.trim().length == 0
  }
}
