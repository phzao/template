// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/consistent-type-definitions
interface String {
  format(...replacements: string[]): string;
  hashCode(...values: string[]): number;
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    return this.replace(/{(\d+)}/g, function (match: any, number: any) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

if (!String.prototype.hashCode) {
  String.prototype.hashCode = function () {
    let hash = 0,
      i,
      chr;
    if (this.length === 0) {
      return hash;
    }
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      hash = (hash << 5) - hash + chr;
      // eslint-disable-next-line no-bitwise
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}
