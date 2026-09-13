const ExcelJS = require("exceljs");
const path = require("path");

const OUTPUT_FILE = path.join(
    __dirname,
    "RTM.xlsx"
);


// =====================================================
// REQUIREMENT DATA
// =====================================================

const requirements = [

    // ===================================================
    // FUNCTIONAL REQUIREMENTS
    // ===================================================

    {
        id: "FR-001",
        description: "The system shall provide an AI-powered chatbot for customer interaction.",
        category: "Chatbot",
        priority: "Must Have",
        stories: "US-01-01, US-08-01",
        scenarios: "TS-CHAT-001",
        testCases: "TC-CHAT-001",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "FR-002",
        description: "The chatbot shall understand natural-language customer queries.",
        category: "NLP",
        priority: "Must Have",
        stories: "US-01-02",
        scenarios: "TS-CHAT-002",
        testCases: "TC-CHAT-002",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "FR-003",
        description: "The chatbot shall provide relevant responses to customer queries related to KYC and banking services.",
        category: "Chatbot",
        priority: "Must Have",
        stories: "US-01-05",
        scenarios: "TS-CHAT-005",
        testCases: "TC-CHAT-005",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "FR-004",
        description: "The system shall support customer identity/KYC information collection.",
        category: "KYC",
        priority: "Must Have",
        stories: "US-02-01, US-08-01",
        scenarios: "TS-KYC-001",
        testCases: "TC-KYC-001",
        jest: "kyc.test.js",
        execution: "PASS"
    },

    {
        id: "FR-005",
        description: "The system shall validate mandatory KYC information before completing a KYC submission.",
        category: "KYC",
        priority: "Must Have",
        stories: "US-02-02",
        scenarios: "TS-KYC-002, TS-KYC-003",
        testCases: "TC-KYC-002, TC-KYC-003",
        jest: "Manual / KYC validation",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-006",
        description: "The system shall identify incomplete or invalid KYC information.",
        category: "KYC",
        priority: "Must Have",
        stories: "US-02-03",
        scenarios: "TS-KYC-004, TS-KYC-005",
        testCases: "TC-KYC-004, TC-KYC-005",
        jest: "Manual / KYC validation",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-007",
        description: "The system shall maintain customer KYC records for processing and verification.",
        category: "KYC",
        priority: "Must Have",
        stories: "US-02-04",
        scenarios: "TS-KYC-006, TS-KYC-007",
        testCases: "TC-KYC-006, TC-KYC-007",
        jest: "Integration / KYC",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-008",
        description: "The system shall support generation and processing of synthetic customer data for KYC testing.",
        category: "KYC Testing",
        priority: "Should Have",
        stories: "US-02-05, US-08-02",
        scenarios: "TS-KYC-008, TS-KYC-009, TS-AUTO-001",
        testCases: "TC-KYC-008, TC-KYC-009, TC-AUTO-001",
        jest: "kyc.test.js",
        execution: "PASS"
    },

    {
        id: "FR-009",
        description: "The system shall identify transactions matching predefined AML risk scenarios.",
        category: "AML",
        priority: "Must Have",
        stories: "US-03-01, US-03-06, US-08-01",
        scenarios: "TS-AML-001, TS-AML-006, TS-AML-012",
        testCases: "TC-AML-001, TC-AML-006, TC-AML-012",
        jest: "aml.test.js",
        execution: "PASS"
    },

    {
        id: "FR-010",
        description: "The system shall support generation of synthetic AML transaction data for testing.",
        category: "AML Testing",
        priority: "Must Have",
        stories: "US-03-02, US-08-02",
        scenarios: "TS-AML-002, TS-AUTO-002",
        testCases: "TC-AML-002, TC-AUTO-002",
        jest: "aml.test.js",
        execution: "PASS"
    },

    {
        id: "FR-011",
        description: "The system shall identify suspicious transaction patterns based on configured scenarios.",
        category: "AML",
        priority: "Must Have",
        stories: "US-03-03, US-03-06",
        scenarios: "TS-AML-003, TS-AML-007, TS-AML-008, TS-AML-009, TS-AML-010, TS-AML-011",
        testCases: "TC-AML-003, TC-AML-007, TC-AML-008, TC-AML-009, TC-AML-010, TC-AML-011",
        jest: "aml.test.js",
        execution: "PASS"
    },

    {
        id: "FR-012",
        description: "The system shall generate alerts for transactions identified as potentially suspicious.",
        category: "AML",
        priority: "Must Have",
        stories: "US-03-04, US-03-06",
        scenarios: "TS-AML-004",
        testCases: "TC-AML-004",
        jest: "aml.test.js",
        execution: "PASS"
    },

    {
        id: "FR-013",
        description: "The system shall allow authorized users to review AML alerts.",
        category: "AML",
        priority: "Must Have",
        stories: "US-03-05",
        scenarios: "TS-AML-005",
        testCases: "TC-AML-005",
        jest: "Manual / Security",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-014",
        description: "The system shall integrate with existing banking/customer systems.",
        category: "Integration",
        priority: "Must Have",
        stories: "US-04-01, US-08-01",
        scenarios: "TS-INT-001",
        testCases: "TC-INT-001",
        jest: "integration.test.js",
        execution: "PASS"
    },

    {
        id: "FR-015",
        description: "The system shall exchange required customer and transaction information with integrated systems.",
        category: "Integration",
        priority: "Must Have",
        stories: "US-04-02",
        scenarios: "TS-INT-002, TS-INT-003",
        testCases: "TC-INT-002, TC-INT-003",
        jest: "integration.test.js",
        execution: "PASS"
    },

    {
        id: "FR-016",
        description: "The system shall handle integration failures without corrupting customer or transaction information.",
        category: "Integration",
        priority: "Must Have",
        stories: "US-04-03",
        scenarios: "TS-INT-004",
        testCases: "TC-INT-004",
        jest: "integration.test.js",
        execution: "PASS"
    },

    {
        id: "FR-017",
        description: "The system shall support multiple concurrent customer interactions.",
        category: "Scalability",
        priority: "Should Have",
        stories: "US-06-01",
        scenarios: "TS-PERF-003",
        testCases: "TC-PERF-002",
        jest: "Performance Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-018",
        description: "The system shall support increasing customer and transaction volumes.",
        category: "Scalability",
        priority: "Should Have",
        stories: "US-06-02",
        scenarios: "TS-PERF-004",
        testCases: "TC-PERF-003",
        jest: "Performance Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-019",
        description: "The system shall maintain acceptable response times under expected workloads.",
        category: "Performance",
        priority: "Must Have",
        stories: "US-06-03, US-08-01",
        scenarios: "TS-PERF-001",
        testCases: "TC-PERF-001",
        jest: "Performance Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "FR-020",
        description: "The system shall support performance testing using representative synthetic data.",
        category: "Performance Testing",
        priority: "Should Have",
        stories: "US-06-04, US-08-02",
        scenarios: "TS-PERF-005, TS-AUTO-003",
        testCases: "TC-PERF-004, TC-AUTO-003",
        jest: "Jest + Performance Test",
        execution: "PARTIAL"
    },


    // ===================================================
    // NON-FUNCTIONAL REQUIREMENTS
    // ===================================================

    {
        id: "NFR-001",
        description: "The system shall protect sensitive customer and KYC information from unauthorized access.",
        category: "Security",
        priority: "Must Have",
        stories: "US-05-01, US-08-01",
        scenarios: "TS-SEC-001",
        testCases: "TC-SEC-001",
        jest: "Security Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-002",
        description: "The system shall provide role-based access for authorized users.",
        category: "Security",
        priority: "Must Have",
        stories: "US-03-05, US-05-02",
        scenarios: "TS-SEC-002",
        testCases: "TC-SEC-002",
        jest: "Security Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-003",
        description: "The system shall maintain confidentiality and integrity of customer information.",
        category: "Security",
        priority: "Must Have",
        stories: "US-05-03",
        scenarios: "TS-SEC-003",
        testCases: "TC-SEC-003",
        jest: "Security Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-004",
        description: "The system shall maintain audit information for important KYC and AML activities.",
        category: "Auditability",
        priority: "Must Have",
        stories: "US-05-04, US-08-01",
        scenarios: "TS-SEC-004",
        testCases: "TC-SEC-004",
        jest: "Audit Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-005",
        description: "The chatbot should provide responses within an acceptable response time under normal operating conditions.",
        category: "Performance",
        priority: "Must Have",
        stories: "US-06-03",
        scenarios: "TS-PERF-001",
        testCases: "TC-PERF-001",
        jest: "Performance Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-006",
        description: "The system should maintain stable performance when the number of users increases.",
        category: "Scalability",
        priority: "Should Have",
        stories: "US-06-02",
        scenarios: "TS-PERF-004",
        testCases: "TC-PERF-003",
        jest: "Performance Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-007",
        description: "The system shall be capable of processing large volumes of synthetic test data.",
        category: "Performance",
        priority: "Should Have",
        stories: "US-02-05, US-06-04",
        scenarios: "TS-KYC-008, TS-PERF-005",
        testCases: "TC-KYC-008, TC-PERF-004",
        jest: "KYC + Performance Test",
        execution: "PARTIAL"
    },

    {
        id: "NFR-008",
        description: "The system shall recover gracefully from temporary integration or service failures.",
        category: "Reliability",
        priority: "Must Have",
        stories: "US-04-03",
        scenarios: "TS-INT-004, TS-REL-001",
        testCases: "TC-INT-004, TC-REL-001",
        jest: "Integration / Recovery Test",
        execution: "NOT EXECUTED"
    },

    {
        id: "NFR-009",
        description: "The system shall provide consistent results for identical valid inputs.",
        category: "Reliability",
        priority: "Must Have",
        stories: "US-01-09, US-07-01",
        scenarios: "TS-CHAT-009, TS-REL-002",
        testCases: "TC-CHAT-009, TC-REL-002",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "NFR-010",
        description: "The system shall support maintainable KYC/AML rules without major system changes.",
        category: "Maintainability",
        priority: "Should Have",
        stories: "US-07-02",
        scenarios: "TS-REL-003",
        testCases: "TC-REL-003",
        jest: "Maintainability Test",
        execution: "NOT EXECUTED"
    },


    // ===================================================
    // AI REQUIREMENTS
    // ===================================================

    {
        id: "AI-001",
        description: "The system shall interpret natural-language customer queries.",
        category: "AI / NLP",
        priority: "Must Have",
        stories: "US-01-02",
        scenarios: "TS-CHAT-002",
        testCases: "TC-CHAT-002",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-002",
        description: "The system shall identify customer-query intent.",
        category: "AI / NLP",
        priority: "Must Have",
        stories: "US-01-03",
        scenarios: "TS-CHAT-003",
        testCases: "TC-CHAT-003",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-003",
        description: "The system shall extract relevant information from customer messages.",
        category: "AI / NLP",
        priority: "Should Have",
        stories: "US-01-04",
        scenarios: "TS-CHAT-004",
        testCases: "TC-CHAT-004",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-004",
        description: "The system shall provide contextually relevant responses.",
        category: "AI / NLP",
        priority: "Must Have",
        stories: "US-01-05",
        scenarios: "TS-CHAT-005",
        testCases: "TC-CHAT-005",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-005",
        description: "The system shall handle wording variations for similar requests.",
        category: "AI / NLP",
        priority: "Should Have",
        stories: "US-01-06",
        scenarios: "TS-CHAT-006",
        testCases: "TC-CHAT-006",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-006",
        description: "The system shall respond appropriately when a query cannot be processed.",
        category: "AI / NLP",
        priority: "Must Have",
        stories: "US-01-07",
        scenarios: "TS-CHAT-007",
        testCases: "TC-CHAT-007",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-007",
        description: "The system shall prevent inappropriate or irrelevant responses.",
        category: "AI / NLP",
        priority: "Must Have",
        stories: "US-01-08",
        scenarios: "TS-CHAT-008",
        testCases: "TC-CHAT-008",
        jest: "chatbot.test.js",
        execution: "PASS"
    },

    {
        id: "AI-008",
        description: "The system shall support evaluation of AI-generated responses as part of testing.",
        category: "AI Testing",
        priority: "Must Have",
        stories: "US-01-09",
        scenarios: "TS-CHAT-009",
        testCases: "TC-CHAT-009",
        jest: "chatbot.test.js",
        execution: "PASS"
    }

];


// =====================================================
// CREATE WORKBOOK
// =====================================================

const workbook = new ExcelJS.Workbook();

workbook.creator = "TechSpark Solutions";
workbook.lastModifiedBy = "GenAI Software Testing Project";
workbook.created = new Date();
workbook.modified = new Date();


// =====================================================
// RTM SHEET
// =====================================================

const sheet = workbook.addWorksheet("RTM");

const headers = [
    "Requirement ID",
    "Requirement Description",
    "Category",
    "Priority",
    "Epic / User Story",
    "Test Scenario ID",
    "Test Case ID",
    "Jest Test File",
    "Execution Status",
    "Traceability Status"
];

sheet.addRow(headers);


// Add requirement rows

requirements.forEach((req) => {

    let traceabilityStatus;

    if (req.execution === "PASS") {
        traceabilityStatus = "Covered & Executed";
    }
    else if (req.execution === "PARTIAL") {
        traceabilityStatus = "Covered - Partial Execution";
    }
    else {
        traceabilityStatus = "Covered - Not Executed";
    }

    sheet.addRow([
        req.id,
        req.description,
        req.category,
        req.priority,
        req.stories,
        req.scenarios,
        req.testCases,
        req.jest,
        req.execution,
        traceabilityStatus
    ]);

});


// =====================================================
// FORMAT RTM
// =====================================================

const headerRow = sheet.getRow(1);

headerRow.font = {
    bold: true,
    color: {
        argb: "FFFFFFFF"
    }
};

headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FF1F4E78"
    }
};

headerRow.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true
};

headerRow.height = 30;


// Column widths

const widths = [
    16,
    65,
    22,
    15,
    28,
    38,
    42,
    28,
    20,
    30
];

widths.forEach((width, index) => {

    sheet.getColumn(index + 1).width = width;

});


// Wrap text

sheet.eachRow((row) => {

    row.eachCell((cell) => {

        cell.alignment = {
            vertical: "top",
            wrapText: true
        };

    });

});


// Freeze header

sheet.views = [
    {
        state: "frozen",
        ySplit: 1
    }
];


// Add autofilter

sheet.autoFilter = {
    from: "A1",
    to: `J${requirements.length + 1}`
};


// =====================================================
// STATUS FORMATTING
// =====================================================

for (
    let rowNumber = 2;
    rowNumber <= requirements.length + 1;
    rowNumber++
) {

    const statusCell =
        sheet.getCell(rowNumber, 9);

    const traceabilityCell =
        sheet.getCell(rowNumber, 10);


    if (statusCell.value === "PASS") {

        statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FFC6EFCE"
            }
        };

        statusCell.font = {
            color: {
                argb: "FF006100"
            },
            bold: true
        };

    }


    if (statusCell.value === "PARTIAL") {

        statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FFFFEB9C"
            }
        };

        statusCell.font = {
            color: {
                argb: "FF9C6500"
            },
            bold: true
        };

    }


    if (statusCell.value === "NOT EXECUTED") {

        statusCell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FFFFC7CE"
            }
        };

        statusCell.font = {
            color: {
                argb: "FF9C0006"
            },
            bold: true
        };

    }

}


// =====================================================
// SUMMARY SHEET
// =====================================================

const summary = workbook.addWorksheet(
    "RTM Summary"
);

summary.addRow([
    "RTM Metric",
    "Value"
]);


// Requirement counts

const totalRequirements =
    requirements.length;

const passedRequirements =
    requirements.filter(
        req => req.execution === "PASS"
    ).length;

const partialRequirements =
    requirements.filter(
        req => req.execution === "PARTIAL"
    ).length;

const notExecutedRequirements =
    requirements.filter(
        req => req.execution === "NOT EXECUTED"
    ).length;

summary.addRow([
    "Total Requirements",
    totalRequirements
]);

summary.addRow([
    "Requirements Covered",
    totalRequirements
]);

summary.addRow([
    "Requirements with PASS execution",
    passedRequirements
]);

summary.addRow([
    "Requirements with PARTIAL execution",
    partialRequirements
]);

summary.addRow([
    "Requirements not yet executed",
    notExecutedRequirements
]);


// Category counts

const categories = [
    "Chatbot",
    "NLP",
    "KYC",
    "KYC Testing",
    "AML",
    "AML Testing",
    "Integration",
    "Scalability",
    "Performance",
    "Performance Testing",
    "Security",
    "Auditability",
    "Reliability",
    "Maintainability",
    "AI / NLP",
    "AI Testing"
];

summary.addRow([]);
summary.addRow([
    "Category",
    "Requirement Count"
]);

categories.forEach((category) => {

    const count =
        requirements.filter(
            req => req.category === category
        ).length;

    if (count > 0) {

        summary.addRow([
            category,
            count
        ]);

    }

});


// Summary formatting

summary.getRow(1).font = {
    bold: true,
    color: {
        argb: "FFFFFFFF"
    }
};

summary.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FF1F4E78"
    }
};

summary.getColumn(1).width = 38;
summary.getColumn(2).width = 22;

summary.eachRow((row) => {

    row.eachCell((cell) => {

        cell.alignment = {
            vertical: "top",
            wrapText: true
        };

    });

});


// =====================================================
// TRACEABILITY LEGEND
// =====================================================

const legend =
    workbook.addWorksheet("Traceability Legend");

legend.addRow([
    "Status",
    "Meaning"
]);

legend.addRow([
    "PASS",
    "Requirement has a mapped automated Jest test and the corresponding Jest test passed."
]);

legend.addRow([
    "PARTIAL",
    "Requirement is covered by test cases, but only part of the requirement has been exercised by the current automation."
]);

legend.addRow([
    "NOT EXECUTED",
    "Requirement has test coverage in the RTM, but the current project does not yet have an executed automated test for that requirement."
]);

legend.addRow([
    "Covered & Executed",
    "Requirement is traceable from requirement through user story, scenario, test case, and executed test."
]);

legend.addRow([
    "Covered - Partial Execution",
    "Requirement has traceability but requires additional execution."
]);

legend.addRow([
    "Covered - Not Executed",
    "Requirement has traceability and test cases but requires execution."
]);


legend.getRow(1).font = {
    bold: true,
    color: {
        argb: "FFFFFFFF"
    }
};

legend.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FF1F4E78"
    }
};

legend.getColumn(1).width = 30;
legend.getColumn(2).width = 90;

legend.eachRow((row) => {

    row.eachCell((cell) => {

        cell.alignment = {
            vertical: "top",
            wrapText: true
        };

    });

});


// =====================================================
// SAVE FILE
// =====================================================

workbook.xlsx.writeFile(OUTPUT_FILE)
    .then(() => {

        console.log(
            `RTM created successfully: ${OUTPUT_FILE}`
        );

        console.log(
            `Total requirements mapped: ${requirements.length}`
        );

        console.log(
            `PASS requirements: ${passedRequirements}`
        );

        console.log(
            `PARTIAL requirements: ${partialRequirements}`
        );

        console.log(
            `NOT EXECUTED requirements: ${notExecutedRequirements}`
        );

    })
    .catch((error) => {

        console.error(
            "Error creating RTM:",
            error
        );

    });