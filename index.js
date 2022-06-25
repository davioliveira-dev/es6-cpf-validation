const validate = (cpf = "") => {
  if (!cpf || cpf.length < 11) {
    return false;
  }

  const CPF_MIN_LENGTH = 11;

  const cleanCpf = cpf.replaceAll(".", "").replace("-", "");

  const isValidFirstDigit = !cleanCpf.split("").every((firstDigit) => {
    return firstDigit === cleanCpf[0];
  });

  if (!isValidFirstDigit) {
    return false;
  }

  try {
    const digitIsEqualZero = (rest) => rest < 2;

    const cpfLength = cleanCpf.length;
    let firstDigit = 0;
    let secondDigit = 0;
    let rest = 0;
    let verifierDigit = 0;

    for (let count = 1; count < cpfLength - 1; count++) {
      const currentDigit = cleanCpf.substring(count - 1, count);

      firstDigit = firstDigit + (CPF_MIN_LENGTH - count) * currentDigit;
      secondDigit = secondDigit + (12 - count) * currentDigit;
    }

    rest = firstDigit % CPF_MIN_LENGTH;

    const dg1 = digitIsEqualZero(rest) ? 0 : CPF_MIN_LENGTH - rest;

    secondDigit += 2 * dg1;

    rest = secondDigit % CPF_MIN_LENGTH;

    const dg2 = digitIsEqualZero(rest) ? 0 : CPF_MIN_LENGTH - rest;

    verifierDigit = cleanCpf.substring(cpfLength - 2, cpfLength);

    const result = `${dg1}${dg2}`;

    const isValidCpf = result === verifierDigit;

    return isValidCpf;
  } catch (error) {
    console.log("deu ruim :(");
    console.log(error.message);
  }
};

const result = validate("017.593.070-84");
console.log("O cpf eh valido:", result);
