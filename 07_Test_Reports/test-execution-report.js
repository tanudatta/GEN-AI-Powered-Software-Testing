const ExcelJS = require("exceljs");
const path = require("path");

const OUTPUT_FILE = path.join(
    __dirname,
    "Test_Execution_Report.xlsx"
);


// =====================================================
// TEST EXECUTION DATA
// Based on the completed Jest execution
// =====================================================

const testResults = [

    // ===================================================
    // KYC TESTS - 7
    // ===================================================

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-008",
        description:
            "Every KYC record should contain required fields",
        testType: "Data Validation",
        result: "PASS"
    },

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-009",
        description:
            "KYC records should contain valid status values",
        testType: "Data Validation",
        result: "PASS"
    },

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-003",
        description:
            "KYC customer IDs should be unique",
        testType: "Data Integrity",
        result: "PASS"
    },

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-004",
        description:
            "KYC customer emails should have a valid format",
        testType: "Data Validation",
        result: "PASS"
    },

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-005",
        description:
            "KYC customer phone numbers should contain 10 digits after +91",
        testType: "Data Validation",
        result: "PASS"
    },

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-006",
        description:
            "KYC risk categories should contain valid values",
        testType: "Data Validation",
        result: "PASS"
    },

    {
        suite: "KYC",
        requirement: "FR-008",
        testCase: "TC-KYC-008",
        description:
            "KYC dataset should contain 50 synthetic records",
        testType: "Data Volume",
        result: "PASS"
    },


    // ===================================================
    // AML TESTS - 12
    // ===================================================

    {
        suite: "AML",
        requirement: "FR-010",
        testCase: "TC-AML-002",
        description:
            "AML dataset should contain 100 records",
        testType: "Data Volume",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-010",
        testCase: "TC-AML-002",
        description:
            "Every AML record should contain required fields",
        testType: "Data Validation",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-010",
        testCase: "TC-AML-003",
        description:
            "AML transaction IDs should be unique",
        testType: "Data Integrity",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-010",
        testCase: "TC-AML-004",
        description:
            "AML transactions should reference a customer ID",
        testType: "Data Integrity",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-009",
        testCase: "TC-AML-005",
        description:
            "AML records should contain valid scenarios",
        testType: "AML Scenario Validation",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-012",
        testCase: "TC-AML-004",
        description:
            "AML records should contain valid alert statuses",
        testType: "Alert Validation",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-011",
        testCase: "TC-AML-006",
        description:
            "AML risk scores should be between 1 and 100",
        testType: "Risk Validation",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-011",
        testCase: "TC-AML-006",
        description:
            "High-value transactions should have elevated risk",
        testType: "AML Scenario",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-011",
        testCase: "TC-AML-007",
        description:
            "Rapid movement transactions should be flagged",
        testType: "AML Scenario",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-011",
        testCase: "TC-AML-008",
        description:
            "High-frequency transactions should be flagged",
        testType: "AML Scenario",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-011",
        testCase: "TC-AML-011",
        description:
            "Cross-border transactions should use a non-India country",
        testType: "AML Scenario",
        result: "PASS"
    },

    {
        suite: "AML",
        requirement: "FR-011",
        testCase: "TC-AML-012",
        description:
            "Normal transactions should not be flagged",
        testType: "AML Scenario",
        result: "PASS"
    },


    // ===================================================
    // CHATBOT / NLP - 9
    // ===================================================

    {
        suite: "Chatbot / NLP",
        requirement: "FR-001",
        testCase: "TC-CHAT-001",
        description:
            "Chatbot should accept a customer message",
        testType: "Functional",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "FR-002",
        testCase: "TC-CHAT-002",
        description:
            "Chatbot should understand a KYC query",
        testType: "NLP",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "AI-002",
        testCase: "TC-CHAT-003",
        description:
            "Chatbot should identify KYC update intent",
        testType: "Intent Classification",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "AI-003",
        testCase: "TC-CHAT-004",
        description:
            "NLP should extract customer ID",
        testType: "Entity Extraction",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "FR-003",
        testCase: "TC-CHAT-005",
        description:
            "Chatbot should provide a relevant KYC response",
        testType: "Response Validation",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "AI-005",
        testCase: "TC-CHAT-006",
        description:
            "Equivalent KYC queries should produce the same intent",
        testType: "NLP Consistency",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "AI-006",
        testCase: "TC-CHAT-007",
        description:
            "Unclear query should return a fallback response",
        testType: "Negative Testing",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "AI-007",
        testCase: "TC-CHAT-008",
        description:
            "Unsupported request should not be treated as a KYC request",
        testType: "Negative Testing",
        result: "PASS"
    },

    {
        suite: "Chatbot / NLP",
        requirement: "AI-008",
        testCase: "TC-CHAT-009",
        description:
            "Same input should produce a consistent chatbot intent",
        testType: "Reliability",
        result: "PASS"
    },


    // ===================================================
    // INTEGRATION - 7
    // ===================================================

    {
        suite: "Integration",
        requirement: "FR-014",
        testCase: "TC-INT-001",
        description:
            "KYC data should be available to the integration layer",
        testType: "Integration",
        result: "PASS"
    },

    {
        suite: "Integration",
        requirement: "FR-015",
        testCase: "TC-INT-002",
        description:
            "Customer IDs should remain consistent across KYC and AML data",
        testType: "Data Integration",
        result: "PASS"
    },

    {
        suite: "Integration",
        requirement: "FR-015",
        testCase: "TC-INT-003",
        description:
            "AML transactions should contain valid customer information",
        testType: "Data Integration",
        result: "PASS"
    },

    {
        suite: "Integration",
        requirement: "FR-016",
        testCase: "TC-INT-004",
        description:
            "Missing customer reference should be detected",
        testType: "Negative Integration",
        result: "PASS"
    },

    {
        suite: "Integration",
        requirement: "FR-015",
        testCase: "TC-INT-005",
        description:
            "AML transaction IDs should be unique",
        testType: "Data Integrity",
        result: "PASS"
    },

    {
        suite: "Integration",
        requirement: "FR-015",
        testCase: "TC-INT-006",
        description:
            "Every AML sender should match the linked KYC customer",
        testType: "Data Relationship",
        result: "PASS"
    },

    {
        suite: "Integration",
        requirement: "FR-015",
        testCase: "TC-INT-007",
        description:
            "AML dataset should contain transactions linked to KYC customers",
        testType: "Integration",
        result: "PASS"
    }

];


// =====================================================
// CREATE WORKBOOK
// =====================================================

const workbook = new ExcelJS.Workbook();

workbook.creator = "GenAI Software Testing Project";
workbook.lastModifiedBy = "TechSpark Solutions";
workbook.created = new Date();
workbook.modified = new Date();


// =====================================================
// EXECUTION RESULTS SHEET
// =====================================================

const resultsSheet =
    workbook.addWorksheet("Execution Results");

resultsSheet.addRow([
    "Test Suite",
    "Requirement ID",
    "Test Case ID",
    "Test Description",
    "Test Type",
    "Expected Result",
    "Actual Result",
    "Status"
]);


testResults.forEach((test) => {

    resultsSheet.addRow([
        test.suite,
        test.requirement,
        test.testCase,
        test.description,
        test.testType,
        "Test condition should be satisfied",
        "Test condition satisfied",
        test.result
    ]);

});


// =====================================================
// FORMAT RESULTS SHEET
// =====================================================

const resultHeader =
    resultsSheet.getRow(1);

resultHeader.font = {
    bold: true,
    color: {
        argb: "FFFFFFFF"
    }
};

resultHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FF1F4E78"
    }
};

resultHeader.alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true
};

resultHeader.height = 30;


const resultWidths = [
    20,
    16,
    18,
    65,
    25,
    40,
    40,
    14
];

resultWidths.forEach((width, index) => {

    resultsSheet.getColumn(
        index + 1
    ).width = width;

});


resultsSheet.eachRow((row) => {

    row.eachCell((cell) => {

        cell.alignment = {
            vertical: "top",
            wrapText: true
        };

    });

});


resultsSheet.views = [
    {
        state: "frozen",
        ySplit: 1
    }
];

resultsSheet.autoFilter = {
    from: "A1",
    to: `H${testResults.length + 1}`
};


// PASS formatting

for (
    let row = 2;
    row <= testResults.length + 1;
    row++
) {

    const statusCell =
        resultsSheet.getCell(row, 8);

    statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
            argb: "FFC6EFCE"
        }
    };

    statusCell.font = {
        bold: true,
        color: {
            argb: "FF006100"
        }
    };

}


// =====================================================
// EXECUTION SUMMARY
// =====================================================

const summary =
    workbook.addWorksheet("Execution Summary");

const totalTests =
    testResults.length;

const passedTests =
    testResults.filter(
        test => test.result === "PASS"
    ).length;

const failedTests =
    testResults.filter(
        test => test.result === "FAIL"
    ).length;

const executionRate =
    ((passedTests / totalTests) * 100).toFixed(2);


summary.addRow([
    "Test Execution Metric",
    "Value"
]);

summary.addRow([
    "Total Automated Tests",
    totalTests
]);

summary.addRow([
    "Passed",
    passedTests
]);

summary.addRow([
    "Failed",
    failedTests
]);

summary.addRow([
    "Pass Percentage",
    `${executionRate}%`
]);

summary.addRow([
    "Execution Status",
    failedTests === 0
        ? "ALL AUTOMATED TESTS PASSED"
        : "FAILURES PRESENT"
]);

summary.addRow([
    "Test Execution Framework",
    "Jest"
]);

summary.addRow([
    "Test Environment",
    "Node.js"
]);

summary.addRow([
    "Data Source",
    "Synthetic KYC and AML JSON datasets"
]);


// Suite summary

summary.addRow([]);

summary.addRow([
    "Test Suite",
    "Total",
    "Passed",
    "Failed",
    "Pass Rate"
]);


const suites = [
    "KYC",
    "AML",
    "Chatbot / NLP",
    "Integration"
];


suites.forEach((suite) => {

    const suiteTests =
        testResults.filter(
            test => test.suite === suite
        );

    const suiteTotal =
        suiteTests.length;

    const suitePassed =
        suiteTests.filter(
            test => test.result === "PASS"
        ).length;

    const suiteFailed =
        suiteTests.filter(
            test => test.result === "FAIL"
        ).length;

    const suiteRate =
        ((suitePassed / suiteTotal) * 100).toFixed(2);

    summary.addRow([
        suite,
        suiteTotal,
        suitePassed,
        suiteFailed,
        `${suiteRate}%`
    ]);

});


// =====================================================
// SUMMARY FORMATTING
// =====================================================

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


summary.getColumn(1).width = 35;
summary.getColumn(2).width = 25;
summary.getColumn(3).width = 15;
summary.getColumn(4).width = 15;
summary.getColumn(5).width = 18;


summary.eachRow((row) => {

    row.eachCell((cell) => {

        cell.alignment = {
            vertical: "top",
            wrapText: true
        };

    });

});


// =====================================================
// DEFECT SUMMARY
// =====================================================

const defects =
    workbook.addWorksheet("Defect Summary");

defects.addRow([
    "Defect ID",
    "Test Case",
    "Description",
    "Status",
    "Resolution"
]);

defects.addRow([
    "DEF-001",
    "TC-CHAT-003",
    "Chatbot returned KYC instead of KYC_UPDATE for an update request.",
    "Resolved",
    "Updated intent matching order so the specific KYC update intent is evaluated before the general KYC intent."
]);

defects.getRow(1).font = {
    bold: true,
    color: {
        argb: "FFFFFFFF"
    }
};

defects.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FF1F4E78"
    }
};

defects.getColumn(1).width = 15;
defects.getColumn(2).width = 20;
defects.getColumn(3).width = 65;
defects.getColumn(4).width = 18;
defects.getColumn(5).width = 80;

defects.eachRow((row) => {

    row.eachCell((cell) => {

        cell.alignment = {
            vertical: "top",
            wrapText: true
        };

    });

});


// =====================================================
// TEST ENVIRONMENT
// =====================================================

const environment =
    workbook.addWorksheet("Test Environment");

environment.addRow([
    "Parameter",
    "Value"
]);

environment.addRow([
    "Automation Framework",
    "Jest"
]);

environment.addRow([
    "Runtime",
    "Node.js"
]);

environment.addRow([
    "Test Configuration",
    "05_Jest/jest.config.js"
]);

environment.addRow([
    "KYC Dataset",
    "03_Synthetic_Data/kyc-data.json"
]);

environment.addRow([
    "AML Dataset",
    "03_Synthetic_Data/aml-data.json"
]);

environment.addRow([
    "KYC Records",
    50
]);

environment.addRow([
    "AML Records",
    100
]);

environment.addRow([
    "Test Suites Executed",
    4
]);

environment.addRow([
    "Total Tests Executed",
    35
]);

environment.addRow([
    "Overall Result",
    "35 PASS / 35 TOTAL"
]);

environment.getRow(1).font = {
    bold: true,
    color: {
        argb: "FFFFFFFF"
    }
};

environment.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
        argb: "FF1F4E78"
    }
};

environment.getColumn(1).width = 30;
environment.getColumn(2).width = 60;


// =====================================================
// SAVE WORKBOOK
// =====================================================

workbook.xlsx.writeFile(OUTPUT_FILE)
    .then(() => {

        console.log(
            "Test Execution Report created successfully:"
        );

        console.log(OUTPUT_FILE);

        console.log(
            `Total tests executed: ${totalTests}`
        );

        console.log(
            `Passed: ${passedTests}`
        );

        console.log(
            `Failed: ${failedTests}`
        );

        console.log(
            `Pass percentage: ${executionRate}%`
        );

    })
    .catch((error) => {

        console.error(
            "Error creating Test Execution Report:",
            error
        );

    });