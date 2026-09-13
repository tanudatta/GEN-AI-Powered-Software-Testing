const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

// Fixed seed makes the generated test data reproducible
faker.seed(20260913);

const OUTPUT_FILE = path.join(__dirname, "kyc-data.json");

// Number of synthetic customers to generate
const RECORD_COUNT = 50;

// Possible KYC values
const idTypes = [
    "PAN",
    "Passport",
    "Driving Licence",
    "Voter ID"
];

const states = [
    "Delhi",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "West Bengal",
    "Gujarat",
    "Telangana",
    "Uttar Pradesh"
];

const genders = [
    "Male",
    "Female",
    "Other"
];

const kycStatuses = [
    "Pending",
    "Verified",
    "Rejected"
];

const riskCategories = [
    "Low",
    "Medium",
    "High"
];

/**
 * Generate one synthetic KYC customer
 */
function generateKycRecord(index) {

    const customerId =
        `CUST-${String(index).padStart(5, "0")}`;

    const record = {

        customerId: customerId,

        fullName:
            faker.person.fullName(),

        dateOfBirth:
            faker.date
                .birthdate({
                    min: 18,
                    max: 75,
                    mode: "age"
                })
                .toISOString()
                .slice(0, 10),

        gender:
            faker.helpers.arrayElement(genders),

        email:
            `${faker.internet.username().toLowerCase()}${index}@example.test`,

        phoneNumber:
            `+91${faker.string.numeric(10)}`,

        address:
            faker.location.streetAddress(),

        city:
            faker.location.city(),

        state:
            faker.helpers.arrayElement(states),

        postalCode:
            faker.location.zipCode("######"),

        identificationType:
            faker.helpers.arrayElement(idTypes),

        identificationNumber:
            `TEST-${faker.string.alphanumeric(9).toUpperCase()}`,

        kycStatus:
            faker.helpers.weightedArrayElement([
                {
                    value: "Pending",
                    weight: 20
                },
                {
                    value: "Verified",
                    weight: 65
                },
                {
                    value: "Rejected",
                    weight: 15
                }
            ]),

        customerRiskCategory:
            faker.helpers.weightedArrayElement([
                {
                    value: "Low",
                    weight: 55
                },
                {
                    value: "Medium",
                    weight: 30
                },
                {
                    value: "High",
                    weight: 15
                }
            ])
    };

    return record;
}

/**
 * Generate all synthetic KYC records
 */
const records = Array.from(
    { length: RECORD_COUNT },
    (_, index) =>
        generateKycRecord(index + 1)
);

/**
 * Save generated data as JSON
 */
fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(records, null, 2)
);

console.log(
    `Generated ${records.length} synthetic KYC records.`
);

console.log(
    `Output file: ${OUTPUT_FILE}`
);