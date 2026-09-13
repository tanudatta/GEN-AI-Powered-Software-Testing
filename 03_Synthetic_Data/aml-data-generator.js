const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

// Fixed seed for reproducible test data
faker.seed(20260913);

const KYC_FILE = path.join(__dirname, "kyc-data.json");
const OUTPUT_FILE = path.join(__dirname, "aml-data.json");

const RECORD_COUNT = 100;

// Transaction types
const transactionTypes = [
    "NEFT",
    "RTGS",
    "IMPS",
    "UPI",
    "Wire Transfer"
];

// Countries
const countries = [
    "India",
    "Singapore",
    "United Arab Emirates",
    "United Kingdom",
    "United States"
];

// AML scenarios
const scenarios = [
    "Normal Transaction",
    "High-Value Transaction",
    "Rapid Movement of Funds",
    "High-Frequency Transactions",
    "Multiple Recipients",
    "Cross-Border Transaction",
    "Unusual Transaction Amount"
];

/**
 * Generate transaction characteristics
 * according to the selected AML scenario.
 */
function buildScenario(scenario) {

    let amount;
    let frequency;
    let riskScore;
    let alertStatus;
    let country;

    switch (scenario) {

        // -----------------------------
        // NORMAL TRANSACTION
        // -----------------------------
        case "Normal Transaction":

            amount = faker.number.float({
                min: 500,
                max: 75000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 1,
                max: 4
            });

            riskScore = faker.number.int({
                min: 1,
                max: 29
            });

            alertStatus = "Not Flagged";

            country = "India";

            break;

        // -----------------------------
        // HIGH VALUE TRANSACTION
        // -----------------------------
        case "High-Value Transaction":

            amount = faker.number.float({
                min: 500000,
                max: 5000000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 1,
                max: 3
            });

            riskScore = faker.number.int({
                min: 70,
                max: 95
            });

            alertStatus = "Flagged";

            country = faker.helpers.arrayElement(
                countries
            );

            break;

        // -----------------------------
        // RAPID MOVEMENT OF FUNDS
        // -----------------------------
        case "Rapid Movement of Funds":

            amount = faker.number.float({
                min: 100000,
                max: 1500000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 5,
                max: 15
            });

            riskScore = faker.number.int({
                min: 65,
                max: 90
            });

            alertStatus = "Flagged";

            country = faker.helpers.arrayElement(
                countries
            );

            break;

        // -----------------------------
        // HIGH FREQUENCY TRANSACTIONS
        // -----------------------------
        case "High-Frequency Transactions":

            amount = faker.number.float({
                min: 25000,
                max: 250000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 15,
                max: 40
            });

            riskScore = faker.number.int({
                min: 55,
                max: 85
            });

            alertStatus = "Flagged";

            country = "India";

            break;

        // -----------------------------
        // MULTIPLE RECIPIENTS
        // -----------------------------
        case "Multiple Recipients":

            amount = faker.number.float({
                min: 100000,
                max: 900000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 6,
                max: 20
            });

            riskScore = faker.number.int({
                min: 55,
                max: 88
            });

            alertStatus = "Flagged";

            country = "India";

            break;

        // -----------------------------
        // CROSS BORDER TRANSACTION
        // -----------------------------
        case "Cross-Border Transaction":

            amount = faker.number.float({
                min: 150000,
                max: 2000000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 1,
                max: 6
            });

            riskScore = faker.number.int({
                min: 45,
                max: 80
            });

            alertStatus =
                riskScore >= 60
                    ? "Flagged"
                    : "Not Flagged";

            country = faker.helpers.arrayElement(
                countries.filter(
                    country => country !== "India"
                )
            );

            break;

        // -----------------------------
        // UNUSUAL TRANSACTION AMOUNT
        // -----------------------------
        case "Unusual Transaction Amount":

            amount = faker.number.float({
                min: 300000,
                max: 1200000,
                fractionDigits: 2
            });

            frequency = faker.number.int({
                min: 1,
                max: 8
            });

            riskScore = faker.number.int({
                min: 45,
                max: 82
            });

            alertStatus =
                riskScore >= 60
                    ? "Flagged"
                    : "Not Flagged";

            country = "India";

            break;
    }

    return {
        amount,
        frequency,
        riskScore,
        alertStatus,
        country
    };
}


/**
 * Check that KYC data exists.
 */
if (!fs.existsSync(KYC_FILE)) {

    console.error(
        "ERROR: kyc-data.json was not found."
    );

    console.error(
        "Please run kyc-data-generator.js first."
    );

    process.exit(1);
}


/**
 * Read the generated KYC customers.
 */
const customers = JSON.parse(
    fs.readFileSync(
        KYC_FILE,
        "utf8"
    )
);


/**
 * Generate AML transaction records.
 */
const amlRecords = Array.from(
    { length: RECORD_COUNT },
    (_, index) => {

        // Select a customer from KYC data
        const customer =
            faker.helpers.arrayElement(
                customers
            );

        // Select AML scenario
        const scenario =
            faker.helpers.weightedArrayElement([

                {
                    value: "Normal Transaction",
                    weight: 40
                },

                {
                    value: "High-Value Transaction",
                    weight: 12
                },

                {
                    value: "Rapid Movement of Funds",
                    weight: 10
                },

                {
                    value: "High-Frequency Transactions",
                    weight: 12
                },

                {
                    value: "Multiple Recipients",
                    weight: 8
                },

                {
                    value: "Cross-Border Transaction",
                    weight: 8
                },

                {
                    value: "Unusual Transaction Amount",
                    weight: 10
                }

            ]);

        // Generate scenario-specific values
        const result =
            buildScenario(scenario);


        return {

            transactionId:
                `TXN-${String(index + 1).padStart(6, "0")}`,

            customerId:
                customer.customerId,

            sender:
                customer.fullName,

            receiver:
                faker.person.fullName(),

            transactionAmount:
                result.amount,

            currency:
                "INR",

            transactionType:
                faker.helpers.arrayElement(
                    transactionTypes
                ),

            transactionDate:
                faker.date
                    .recent({
                        days: 180
                    })
                    .toISOString(),

            sourceAccount:
                `ACCT-${faker.string.numeric(8)}`,

            destinationAccount:
                `ACCT-${faker.string.numeric(8)}`,

            country:
                result.country,

            transactionFrequency:
                result.frequency,

            riskScore:
                result.riskScore,

            amlScenario:
                scenario,

            alertStatus:
                result.alertStatus
        };
    }
);


/**
 * Save AML data to JSON.
 */
fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
        amlRecords,
        null,
        2
    )
);


/**
 * Display success message.
 */
console.log(
    `Generated ${amlRecords.length} synthetic AML records.`
);

console.log(
    `Output file: ${OUTPUT_FILE}`
);n