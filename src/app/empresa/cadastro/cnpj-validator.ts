
export class CnpjValidator {

  static isValido(cnpj): boolean {
    console.log('validando');
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (!cnpj || cnpj.length != 14) {
      return false;
    }

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let digito = parseInt(digitos.charAt(0));
    if (!CnpjValidator.isDigitoValido(tamanho, numeros, digito)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    digito = parseInt(digitos.charAt(1));
    if (!CnpjValidator.isDigitoValido(tamanho, numeros, digito)) {
      return false;
    }
    return true;
  }

  private static isDigitoValido(tamanho: number, numeros: string, digito: number): boolean {
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
        pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === digito;
  }
}