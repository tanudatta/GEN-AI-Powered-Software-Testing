const fs = require("fs");
const path = require("path");

// Output file
const OUTPUT_FILE = path.join(
    __dirname,
    "test-scenarios.json"
);

/*
 * Test Scenario Structure
 *
 * Each scenario contains:
 * - Scenario ID
 * - Requirement ID
 * - Module
 * - Scenario
 * - Test Type
 * - Priority
 */

const testScenarios = [

    // =====================================================
    // CHATBOT & NLP
    // =====================================================

    {
        scenarioId: "TS-CHAT-001",
        requirementId: "FR-001",
        module: "AI Chatbot",
        scenario: "Verify that the AI chatbot accepts a customer conversation.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-CHAT-002",
        requirementId: "FR-002",
        module: "NLP",
        scenario: "Verify that the chatbot understands a valid natural-language customer query.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-CHAT-003",
        requirementId: "AI-002",
        module: "NLP",
        scenario: "Verify that the chatbot correctly identifies the intent of a customer query.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-CHAT-004",
        requirementId: "AI-003",
        module: "NLP",
        scenario: "Verify that relevant customer information is extracted from a natural-language message.",
        testType: "Functional",
        priority: "Medium"
    },

    {
        scenarioId: "TS-CHAT-005",
        requirementId: "FR-003",
        module: "AI Chatbot",
        scenario: "Verify that the chatbot provides relevant responses to KYC and banking queries.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-CHAT-006",
        requirementId: "AI-005",
        module: "NLP",
        scenario: "Verify that differently worded versions of the same request are interpreted consistently.",
        testType: "Functional",
        priority: "Medium"
    },

    {
        scenarioId: "TS-CHAT-007",
        requirementId: "AI-006",
        module: "NLP",
        scenario: "Verify that the chatbot provides an appropriate fallback response for an unclear query.",
        testType: "Negative",
        priority: "High"
    },

    {
        scenarioId: "TS-CHAT-008",
        requirementId: "AI-007",
        module: "AI Chatbot",
        scenario: "Verify that inappropriate or irrelevant requests do not result in inappropriate responses.",
        testType: "Negative",
        priority: "High"
    },

    {
        scenarioId: "TS-CHAT-009",
        requirementId: "AI-008",
        module: "AI Evaluation",
        scenario: "Verify that AI-generated chatbot responses can be evaluated for relevance and consistency.",
        testType: "AI Quality",
        priority: "Medium"
    },


    // =====================================================
    // KYC
    // =====================================================

    {
        scenarioId: "TS-KYC-001",
        requirementId: "FR-004",
        module: "KYC",
        scenario: "Verify that a customer can submit required KYC information.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-002",
        requirementId: "FR-005",
        module: "KYC",
        scenario: "Verify that mandatory KYC fields are validated before submission.",
        testType: "Validation",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-003",
        requirementId: "FR-005",
        module: "KYC",
        scenario: "Verify that submission is prevented when a mandatory KYC field is missing.",
        testType: "Negative",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-004",
        requirementId: "FR-006",
        module: "KYC",
        scenario: "Verify that invalid KYC information is identified.",
        testType: "Negative",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-005",
        requirementId: "FR-006",
        module: "KYC",
        scenario: "Verify that incomplete KYC information is identified.",
        testType: "Negative",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-006",
        requirementId: "FR-007",
        module: "KYC",
        scenario: "Verify that a valid KYC record is stored successfully.",
        testType: "Integration",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-007",
        requirementId: "FR-007",
        module: "KYC",
        scenario: "Verify that an authorized user can retrieve a stored KYC record.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-KYC-008",
        requirementId: "FR-008",
        module: "KYC Test Data",
        scenario: "Verify that synthetic KYC data contains the required customer fields.",
        testType: "Data Validation",
        priority: "Medium"
    },

    {
        scenarioId: "TS-KYC-009",
        requirementId: "FR-008",
        module: "KYC Test Data",
        scenario: "Verify that synthetic KYC data contains different KYC statuses.",
        testType: "Data Validation",
        priority: "Medium"
    },


    // =====================================================
    // AML
    // =====================================================

    {
        scenarioId: "TS-AML-001",
        requirementId: "FR-009",
        module: "AML",
        scenario: "Verify that transactions are evaluated against predefined AML risk scenarios.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-002",
        requirementId: "FR-010",
        module: "AML Test Data",
        scenario: "Verify that synthetic AML transactions are generated successfully.",
        testType: "Data Validation",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-003",
        requirementId: "FR-011",
        module: "AML",
        scenario: "Verify that suspicious transaction patterns are identified.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-004",
        requirementId: "FR-012",
        module: "AML",
        scenario: "Verify that a suspicious transaction generates an AML alert.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-005",
        requirementId: "FR-013",
        module: "AML",
        scenario: "Verify that an authorized compliance user can review an AML alert.",
        testType: "Functional",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-006",
        requirementId: "FR-009",
        module: "AML",
        scenario: "Verify detection of a high-value transaction.",
        testType: "Risk Scenario",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-007",
        requirementId: "FR-011",
        module: "AML",
        scenario: "Verify detection of rapid movement of funds.",
        testType: "Risk Scenario",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-008",
        requirementId: "FR-011",
        module: "AML",
        scenario: "Verify detection of high-frequency transactions.",
        testType: "Risk Scenario",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-009",
        requirementId: "FR-011",
        module: "AML",
        scenario: "Verify detection of transactions involving multiple recipients.",
        testType: "Risk Scenario",
        priority: "Medium"
    },

    {
        scenarioId: "TS-AML-010",
        requirementId: "FR-011",
        module: "AML",
        scenario: "Verify detection of unusual transaction amounts.",
        testType: "Risk Scenario",
        priority: "High"
    },

    {
        scenarioId: "TS-AML-011",
        requirementId: "FR-011",
        module: "AML",
        scenario: "Verify handling of cross-border transactions.",
        testType: "Risk Scenario",
        priority: "Medium"
    },

    {
        scenarioId: "TS-AML-012",
        requirementId: "FR-009",
        module: "AML",
        scenario: "Verify that a normal transaction is not incorrectly flagged.",
        testType: "Negative",
        priority: "High"
    },


    // =====================================================
    // INTEGRATION
    // =====================================================

    {
        scenarioId: "TS-INT-001",
        requirementId: "FR-014",
        module: "Integration",
        scenario: "Verify integration between the customer system and KYC platform.",
        testType: "Integration",
        priority: "High"
    },

    {
        scenarioId: "TS-INT-002",
        requirementId: "FR-015",
        module: "Integration",
        scenario: "Verify correct exchange of customer information between integrated systems.",
        testType: "Integration",
        priority: "High"
    },

    {
        scenarioId: "TS-INT-003",
        requirementId: "FR-015",
        module: "Integration",
        scenario: "Verify correct exchange of transaction information between integrated systems.",
        testType: "Integration",
        priority: "High"
    },

    {
        scenarioId: "TS-INT-004",
        requirementId: "FR-016",
        module: "Integration",
        scenario: "Verify that temporary integration failures are handled without data corruption.",
        testType: "Negative",
        priority: "High"
    },


    // =====================================================
    // SECURITY
    // =====================================================

    {
        scenarioId: "TS-SEC-001",
        requirementId: "NFR-001",
        module: "Security",
        scenario: "Verify that unauthorized users cannot access sensitive KYC information.",
        testType: "Security",
        priority: "High"
    },

    {
        scenarioId: "TS-SEC-002",
        requirementId: "NFR-002",
        module: "Security",
        scenario: "Verify role-based access control for authorized users.",
        testType: "Security",
        priority: "High"
    },

    {
        scenarioId: "TS-SEC-003",
        requirementId: "NFR-003",
        module: "Security",
        scenario: "Verify confidentiality and integrity of customer information.",
        testType: "Security",
        priority: "High"
    },

    {
        scenarioId: "TS-SEC-004",
        requirementId: "NFR-004",
        module: "Audit",
        scenario: "Verify that important KYC and AML activities are recorded for audit purposes.",
        testType: "Audit",
        priority: "Medium"
    },


    // =====================================================
    // PERFORMANCE & SCALABILITY
    // =====================================================

    {
        scenarioId: "TS-PERF-001",
        requirementId: "FR-019",
        module: "Performance",
        scenario: "Verify chatbot response time under normal workload.",
        testType: "Performance",
        priority: "High"
    },

    {
        scenarioId: "TS-PERF-002",
        requirementId: "NFR-005",
        module: "Performance",
        scenario: "Verify that chatbot responses remain within the defined response-time target.",
        testType: "Performance",
        priority: "High"
    },

    {
        scenarioId: "TS-PERF-003",
        requirementId: "FR-017",
        module: "Scalability",
        scenario: "Verify that the platform supports multiple concurrent customer interactions.",
        testType: "Load",
        priority: "Medium"
    },

    {
        scenarioId: "TS-PERF-004",
        requirementId: "FR-018",
        module: "Scalability",
        scenario: "Verify system stability when customer and transaction volume increases.",
        testType: "Load",
        priority: "Medium"
    },

    {
        scenarioId: "TS-PERF-005",
        requirementId: "FR-020",
        module: "Performance Testing",
        scenario: "Verify performance testing using representative synthetic data.",
        testType: "Performance",
        priority: "Medium"
    },


    // =====================================================
    // RELIABILITY & MAINTAINABILITY
    // =====================================================

    {
        scenarioId: "TS-REL-001",
        requirementId: "NFR-008",
        module: "Reliability",
        scenario: "Verify graceful recovery after a temporary service failure.",
        testType: "Recovery",
        priority: "Medium"
    },

    {
        scenarioId: "TS-REL-002",
        requirementId: "NFR-009",
        module: "Reliability",
        scenario: "Verify consistent results for identical valid inputs.",
        testType: "Consistency",
        priority: "High"
    },

    {
        scenarioId: "TS-REL-003",
        requirementId: "NFR-010",
        module: "Maintainability",
        scenario: "Verify that KYC and AML rules can be updated without major system changes.",
        testType: "Maintainability",
        priority: "Medium"
    },


    // =====================================================
    // TEST AUTOMATION
    // =====================================================

    {
        scenarioId: "TS-AUTO-001",
        requirementId: "FR-008",
        module: "Test Automation",
        scenario: "Verify that synthetic KYC data can be consumed by automated tests.",
        testType: "Automation",
        priority: "High"
    },

    {
        scenarioId: "TS-AUTO-002",
        requirementId: "FR-010",
        module: "Test Automation",
        scenario: "Verify that synthetic AML data can be consumed by automated tests.",
        testType: "Automation",
        priority: "High"
    },

    {
        scenarioId: "TS-AUTO-003",
        requirementId: "FR-020",
        module: "Test Automation",
        scenario: "Verify that automated Jest tests can execute the defined test scenarios.",
        testType: "Automation",
        priority: "High"
    }

];


// =====================================================
// WRITE JSON FILE
// =====================================================

fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
        testScenarios,
        null,
        2
    )
);

console.log(
    `Generated ${testScenarios.length} test scenarios.`
);

console.log(
    `Output file: ${OUTPUT_FILE}`
);