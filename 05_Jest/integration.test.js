const fs = require("fs");
const path = require("path");

// Load KYC data
const kycFile = path.join(
    __dirname,
    "..",
    "03_Synthetic_Data",
    "kyc-data.json"
);

// Load AML data
const amlFile = path.join(
    __dirname,
    "..",
    "03_Synthetic_Data",
    "aml-data.json"
);

const kycData = JSON.parse(
    fs.readFileSync(kycFile, "utf8")
);

const amlData = JSON.parse(
    fs.readFileSync(amlFile, "utf8")
);


// =====================================================
// INTEGRATION TEST SUITE
// =====================================================

describe("KYC and AML Integration Tests", () => {

    // ===================================================
    // TC-INT-001
    // FR-014
    // ===================================================

    test(
        "TC-INT-001: KYC data should be available to the integration layer",
        () => {

            expect(kycData.length).toBeGreaterThan(0);

            kycData.forEach((customer) => {

                expect(customer.customerId).toBeDefined();
                expect(customer.fullName).toBeDefined();

            });

        }
    );


    // ===================================================
    // TC-INT-002
    // FR-015
    // ===================================================

    test(
        "TC-INT-002: Customer IDs should remain consistent across KYC and AML data",
        () => {

            const kycCustomerIds = new Set(
                kycData.map(
                    customer => customer.customerId
                )
            );

            amlData.forEach((transaction) => {

                expect(
                    kycCustomerIds.has(
                        transaction.customerId
                    )
                ).toBe(true);

            });

        }
    );


    // ===================================================
    // TC-INT-003
    // FR-015
    // ===================================================

    test(
        "TC-INT-003: AML transactions should contain valid customer information",
        () => {

            const customerMap = new Map(
                kycData.map(
                    customer => [
                        customer.customerId,
                        customer
                    ]
                )
            );

            amlData.forEach((transaction) => {

                const customer =
                    customerMap.get(
                        transaction.customerId
                    );

                expect(customer).toBeDefined();

                expect(
                    transaction.sender
                ).toBe(
                    customer.fullName
                );

            });

        }
    );


    // ===================================================
    // TC-INT-004
    // FR-016
    // ===================================================

    test(
        "TC-INT-004: Missing customer reference should be detected",
        () => {

            const invalidTransaction = {
                transactionId: "TXN-INVALID",
                customerId: "CUST-99999"
            };

            const kycCustomerIds = new Set(
                kycData.map(
                    customer => customer.customerId
                )
            );

            const customerExists =
                kycCustomerIds.has(
                    invalidTransaction.customerId
                );

            expect(customerExists).toBe(false);

        }
    );


    // ===================================================
    // DATA INTEGRITY
    // ===================================================

    test(
        "Integration: AML transaction IDs should be unique",
        () => {

            const transactionIds =
                amlData.map(
                    transaction =>
                        transaction.transactionId
                );

            const uniqueTransactionIds =
                new Set(transactionIds);

            expect(
                uniqueTransactionIds.size
            ).toBe(
                transactionIds.length
            );

        }
    );


    // ===================================================
    // DATA RELATIONSHIP
    // ===================================================

    test(
        "Integration: Every AML sender should match the linked KYC customer",
        () => {

            const customerMap = new Map(
                kycData.map(
                    customer => [
                        customer.customerId,
                        customer.fullName
                    ]
                )
            );

            amlData.forEach((transaction) => {

                expect(
                    customerMap.get(
                        transaction.customerId
                    )
                ).toBe(
                    transaction.sender
                );

            });

        }
    );


    // ===================================================
    // AML DATA AVAILABILITY
    // ===================================================

    test(
        "Integration: AML dataset should contain transactions linked to KYC customers",
        () => {

            expect(
                amlData.length
            ).toBeGreaterThan(0);

            const linkedTransactions =
                amlData.filter(
                    transaction =>
                        kycData.some(
                            customer =>
                                customer.customerId ===
                                transaction.customerId
                        )
                );

            expect(
                linkedTransactions.length
            ).toBe(
                amlData.length
            );

        }
    );

});