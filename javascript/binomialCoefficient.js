function binomialCoefficient(n, k) {
    if (k < 0 || k > n) {
        return 0;
    }
    let result = 1;

    for (let i = 1; i <= k; i++) {
        result *= (n - i + 1) / i;
    }

    return Math.round(result);
}
const n = 5;
const k = 3;
console.log(
    `The binomial coefficient of ${n} choose ${k} is: ${binomialCoefficient(
        n,
        k
    )}`
);
