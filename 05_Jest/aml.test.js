const fs = require("fs");
const path = require("path");

// Load synthetic AML data
const amlFile = path.join(
    __dirname,
    "..",
    "03_Synthetic_Data",
    "aml-data.json"
);

const amlData = JSON.parse(
    fs.readFileSync(amlFile, "utf8")
);


describe("AML Synthetic Data Tests", () => {

    // =====================================================
    // TC-AML-002
    // FR-010
    // =====================================================

    test(
        "TC-AML-002: AML dataset should contain 100 records",
        () => {

            expect(amlData.length).toBe(100);

        }
    );


    // =====================================================
    // TC-AML-002
    // Required fields
    // =====================================================

    test(
        "TC-AML-002: Every AML record should contain required fields",
        () => {

            expect(amlData.length).toBeGreaterThan(0);

            amlData.forEach((transaction) => {

                expect(transaction).toHaveProperty(
                    "transactionId"
                );

                expect(transaction).toHaveProperty(
                    "customerId"
                );

                expect(transaction).toHaveProperty(
                    "sender"
                );

                expect(transaction).toHaveProperty(
                    "receiver"
                );

                expect(transaction).toHaveProperty(
                    "transactionAmount"
                );

                expect(transaction).toHaveProperty(
                    "currency"
                );

                expect(transaction).toHaveProperty(
                    "transactionType"
                );

                expect(transaction).toHaveProperty(
                    "transactionDate"
                );

                expect(transaction).toHaveProperty(
                    "sourceAccount"
                );

                expect(transaction).toHaveProperty(
                    "destinationAccount"
                );

                expect(transaction).toHaveProperty(
                    "country"
                );

                expect(transaction).toHaveProperty(
                    "transactionFrequency"
                );

                expect(transaction).toHaveProperty(
                    "riskScore"
                );

                expect(transaction).toHaveProperty(
                    "amlScenario"
                );

                expect(transaction).toHaveProperty(
                    "alertStatus"
                );

            });

        }
    );


    // =====================================================
    // Transaction ID uniqueness
    // =====================================================

    test(
        "AML transaction IDs should be unique",
        () => {

            const transactionIds =
                amlData.map(
                    transaction =>
                        transaction.transactionId
                );

            const uniqueIds =
                new Set(transactionIds);

            expect(uniqueIds.size).toBe(
                transactionIds.length
            );

        }
    );


    // =====================================================
    // Customer ID linkage
    // =====================================================

    test(
        "AML transactions should reference a customer ID",
        () => {

            amlData.forEach((transaction) => {

                expect(
                    transaction.customerId
                ).toMatch(/^CUST-\d{5}$/);

            });

        }
    );


    // =====================================================
    // AML scenario validation
    // =====================================================

    test(
        "AML records should contain valid scenarios",
        () => {

            const validScenarios = [
                "Normal Transaction",
                "High-Value Transaction",
                "Rapid Movement of Funds",
                "High-Frequency Transactions",
                "Multiple Recipients",
                "Cross-Border Transaction",
                "Unusual Transaction Amount"
            ];

            amlData.forEach((transaction) => {

                expect(
                    validScenarios
                ).toContain(
                    transaction.amlScenario
                );

            });

        }
    );


    // =====================================================
    // Alert status validation
    // =====================================================

    test(
        "AML records should contain valid alert statuses",
        () => {

            const validStatuses = [
                "Flagged",
                "Not Flagged"
            ];

            amlData.forEach((transaction) => {

                expect(
                    validStatuses
                ).toContain(
                    transaction.alertStatus
                );

            });

        }
    );


    // =====================================================
    // Risk score validation
    // =====================================================

    test(
        "AML risk scores should be between 1 and 100",
        () => {

            amlData.forEach((transaction) => {

                expect(
                    transaction.riskScore
                ).toBeGreaterThanOrEqual(1);

                expect(
                    transaction.riskScore
                ).toBeLessThanOrEqual(100);

            });

        }
    );


    // =====================================================
    // High-value transaction test
    // =====================================================

    test(
        "TC-AML-006: High-value transactions should have elevated risk",
        () => {

            const highValueTransactions =
                amlData.filter(
                    transaction =>
                        transaction.amlScenario ===
                        "High-Value Transaction"
                );

            expect(
                highValueTransactions.length
            ).toBeGreaterThan(0);

            highValueTransactions.forEach(
                (transaction) => {

                    expect(
                        transaction.transactionAmount
                    ).toBeGreaterThanOrEqual(500000);

                    expect(
                        transaction.riskScore
                    ).toBeGreaterThanOrEqual(70);

                    expect(
                        transaction.alertStatus
                    ).toBe("Flagged");

                }
            );

        }
    );


    // =====================================================
    // Rapid movement of funds
    // =====================================================

    test(
        "TC-AML-007: Rapid movement transactions should be flagged",
        () => {

            const transactions =
                amlData.filter(
                    transaction =>
                        transaction.amlScenario ===
                        "Rapid Movement of Funds"
                );

            expect(
                transactions.length
            ).toBeGreaterThan(0);

            transactions.forEach(
                (transaction) => {

                    expect(
                        transaction.transactionFrequency
                    ).toBeGreaterThanOrEqual(5);

                    expect(
                        transaction.riskScore
                    ).toBeGreaterThanOrEqual(65);

                    expect(
                        transaction.alertStatus
                    ).toBe("Flagged");

                }
            );

        }
    );


    // =====================================================
    // High-frequency transactions
    // =====================================================

    test(
        "TC-AML-008: High-frequency transactions should be flagged",
        () => {

            const transactions =
                amlData.filter(
                    transaction =>
                        transaction.amlScenario ===
                        "High-Frequency Transactions"
                );

            expect(
                transactions.length
            ).toBeGreaterThan(0);

            transactions.forEach(
                (transaction) => {

                    expect(
                        transaction.transactionFrequency
                    ).toBeGreaterThanOrEqual(15);

                    expect(
                        transaction.riskScore
                    ).toBeGreaterThanOrEqual(55);

                    expect(
                        transaction.alertStatus
                    ).toBe("Flagged");

                }
            );

        }
    );


    // =====================================================
    // Cross-border transactions
    // =====================================================

    test(
        "TC-AML-011: Cross-border transactions should use a non-India country",
        () => {

            const transactions =
                amlData.filter(
                    transaction =>
                        transaction.amlScenario ===
                        "Cross-Border Transaction"
                );

            expect(
                transactions.length
            ).toBeGreaterThan(0);

            transactions.forEach(
                (transaction) => {

                    expect(
                        transaction.country
                    ).not.toBe("India");

                }
            );

        }
    );


    // =====================================================
    // Normal transactions
    // =====================================================

    test(
        "TC-AML-012: Normal transactions should not be flagged",
        () => {

            const transactions =
                amlData.filter(
                    transaction =>
                        transaction.amlScenario ===
                        "Normal Transaction"
                );

            expect(
                transactions.length
            ).toBeGreaterThan(0);

            transactions.forEach(
                (transaction) => {

                    expect(
                        transaction.riskScore
                    ).toBeLessThan(30);

                    expect(
                        transaction.alertStatus
                    ).toBe("Not Flagged");

                }
            );

        }
    );

});