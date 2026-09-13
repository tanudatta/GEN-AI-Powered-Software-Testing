const fs = require("fs");
const path = require("path");

// Load the synthetic KYC dataset
const kycFile = path.join(
    __dirname,
    "..",
    "03_Synthetic_Data",
    "kyc-data.json"
);

const kycData = JSON.parse(
    fs.readFileSync(kycFile, "utf8")
);


describe("KYC Synthetic Data Tests", () => {

    test(
        "TC-KYC-008: Every KYC record should contain required fields",
        () => {

            expect(kycData.length).toBeGreaterThan(0);

            kycData.forEach((customer) => {

                expect(customer).toHaveProperty("customerId");
                expect(customer).toHaveProperty("fullName");
                expect(customer).toHaveProperty("dateOfBirth");
                expect(customer).toHaveProperty("gender");
                expect(customer).toHaveProperty("email");
                expect(customer).toHaveProperty("phoneNumber");
                expect(customer).toHaveProperty("address");
                expect(customer).toHaveProperty("city");
                expect(customer).toHaveProperty("state");
                expect(customer).toHaveProperty("postalCode");
                expect(customer).toHaveProperty("identificationType");
                expect(customer).toHaveProperty("identificationNumber");
                expect(customer).toHaveProperty("kycStatus");
                expect(customer).toHaveProperty("customerRiskCategory");

            });

        }
    );


    test(
        "TC-KYC-009: KYC records should contain valid status values",
        () => {

            const validStatuses = [
                "Pending",
                "Verified",
                "Rejected"
            ];

            kycData.forEach((customer) => {

                expect(validStatuses).toContain(
                    customer.kycStatus
                );

            });

        }
    );


    test(
        "KYC customer IDs should be unique",
        () => {

            const customerIds = kycData.map(
                customer => customer.customerId
            );

            const uniqueIds = new Set(customerIds);

            expect(uniqueIds.size).toBe(
                customerIds.length
            );

        }
    );


    test(
        "KYC customer emails should have a valid format",
        () => {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            kycData.forEach((customer) => {

                expect(customer.email).toMatch(
                    emailPattern
                );

            });

        }
    );


    test(
        "KYC customer phone numbers should contain 10 digits after +91",
        () => {

            const phonePattern =
                /^\+91\d{10}$/;

            kycData.forEach((customer) => {

                expect(customer.phoneNumber).toMatch(
                    phonePattern
                );

            });

        }
    );


    test(
        "KYC risk categories should contain valid values",
        () => {

            const validRiskCategories = [
                "Low",
                "Medium",
                "High"
            ];

            kycData.forEach((customer) => {

                expect(
                    validRiskCategories
                ).toContain(
                    customer.customerRiskCategory
                );

            });

        }
    );


    test(
        "KYC dataset should contain 50 synthetic records",
        () => {

            expect(kycData.length).toBe(50);

        }
    );

});