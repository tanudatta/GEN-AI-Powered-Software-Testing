const fs = require("fs");
const path = require("path");

const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    ShadingType
} = require("docx");

// ============================================================
// PROJECT DATA
// ============================================================

const OUTPUT_FILE = path.join(__dirname, "Final_Project_Report.docx");

const project = {
    organization: "TechSpark Solutions",
    title: "AI-Driven KYC & Anti-Money Laundering Banking Platform",
    role: "Test Manager",
    version: "1.0"
};

const epics = [
    ["EPIC-01", "AI Customer Chatbot", 9, 49, "Sprint 1"],
    ["EPIC-02", "KYC Management", 5, 28, "Sprint 2"],
    ["EPIC-03", "AML Monitoring", 6, 36, "Sprint 3"],
    ["EPIC-04", "Banking System Integration", 3, 24, "Sprint 2"],
    ["EPIC-05", "Security & Audit", 4, 26, "Sprint 4"],
    ["EPIC-06", "Scalability & Performance", 4, 29, "Sprint 4"],
    ["EPIC-07", "Reliability & Maintainability", 2, 13, "Sprint 4"],
    ["EPIC-08", "Quality Engineering & Test Automation", 2, 13, "Sprint 1"]
];

const sprints = [
    ["Sprint 1", "Requirements traceability, AI chatbot and NLP foundation", 9, 49],
    ["Sprint 2", "KYC management, synthetic KYC data and core integration", 6, 36],
    ["Sprint 3", "AML monitoring, synthetic AML data and integration resilience", 8, 52],
    ["Sprint 4", "Security, audit, scalability, performance and automation", 12, 81]
];

const testResults = {
    total: 35,
    passed: 35,
    failed: 0,
    passPercentage: "100%"
};

// ============================================================
// HELPERS
// ============================================================

function heading(text, level = HeadingLevel.HEADING_1) {
    return new Paragraph({
        text,
        heading: level,
        spacing: {
            before: 300,
            after: 150
        }
    });
}

function paragraph(text, boldStart = null) {
    if (boldStart && text.startsWith(boldStart)) {
        return new Paragraph({
            children: [
                new TextRun({ text: boldStart, bold: true }),
                new TextRun({ text: text.substring(boldStart.length) })
            ],
            spacing: { after: 120 }
        });
    }

    return new Paragraph({
        children: [new TextRun(text)],
        spacing: { after: 120 }
    });
}

function bullet(text) {
    return new Paragraph({
        text,
        bullet: {
            level: 0
        },
        spacing: { after: 80 }
    });
}

function numbered(text) {
    return new Paragraph({
        text,
        numbering: {
            reference: "numbered-list",
            level: 0
        },
        spacing: { after: 80 }
    });
}

function cell(text, bold = false) {
    return new TableCell({
        width: {
            size: 20,
            type: WidthType.PERCENTAGE
        },
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: String(text),
                        bold
                    })
                ]
            })
        ]
    });
}

function makeTable(headers, rows) {
    const headerRow = new TableRow({
        children: headers.map(h => cell(h, true))
    });

    const dataRows = rows.map(row =>
        new TableRow({
            children: row.map(value => cell(value))
        })
    );

    return new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        rows: [headerRow, ...dataRows],
        borders: {
            top: {
                style: BorderStyle.SINGLE,
                size: 1
            },
            bottom: {
                style: BorderStyle.SINGLE,
                size: 1
            },
            left: {
                style: BorderStyle.SINGLE,
                size: 1
            },
            right: {
                style: BorderStyle.SINGLE,
                size: 1
            },
            insideHorizontal: {
                style: BorderStyle.SINGLE,
                size: 1
            },
            insideVertical: {
                style: BorderStyle.SINGLE,
                size: 1
            }
        }
    });
}

function pageBreak() {
    return new Paragraph({
        pageBreakBefore: true,
        children: []
    });
}

// ============================================================
// DOCUMENT CONTENT
// ============================================================

const children = [];

// ------------------------------------------------------------
// COVER PAGE
// ------------------------------------------------------------

children.push(
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200, after: 300 },
        children: [
            new TextRun({
                text: project.organization,
                bold: true,
                size: 32
            })
        ]
    }),

    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
            new TextRun({
                text: "FINAL PROJECT REPORT",
                bold: true,
                size: 38
            })
        ]
    }),

    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 500 },
        children: [
            new TextRun({
                text: project.title,
                bold: true,
                size: 28
            })
        ]
    }),

    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [
            new TextRun({
                text: "Generative AI in Software Testing",
                size: 24
            })
        ]
    }),

    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [
            new TextRun({
                text: `Project Role: ${project.role}`,
                size: 22
            })
        ]
    }),

    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [
            new TextRun({
                text: `Version ${project.version}`,
                size: 22
            })
        ]
    }),

    pageBreak()
);

// ------------------------------------------------------------
// 1. EXECUTIVE SUMMARY
// ------------------------------------------------------------

children.push(
    heading("1. Executive Summary"),

    paragraph(
        "This project demonstrates the application of Generative AI throughout the software testing lifecycle for an AI-driven KYC and Anti-Money Laundering banking platform. The project was approached from the perspective of a Test Manager and covered requirements engineering, Agile backlog creation, synthetic test-data generation, test-case development, automated testing with Jest, Requirements Traceability Matrix generation, and reporting."
    ),

    paragraph(
        "Generative AI was used primarily as an accelerator for requirements ideation, user-story drafting, acceptance-criteria creation, test-scenario development and project documentation. Human review remained necessary to validate generated outputs and align them with the project objectives."
    ),

    paragraph(
        `The implemented testing workflow resulted in ${testResults.total} automated Jest tests, with ${testResults.passed} tests passing and ${testResults.failed} tests failing, producing a ${testResults.passPercentage} pass rate for the executed test set.`
    ),

    paragraph(
        "The project established a traceable workflow from requirements through user stories, test cases, execution results and RTM reporting."
    )
);

// ------------------------------------------------------------
// 2. PROJECT BACKGROUND
// ------------------------------------------------------------

children.push(
    heading("2. Project Background"),

    paragraph(
        "TechSpark Solutions requires a testing framework for a banking platform covering KYC, AML, AI chatbot functionality, NLP, system integration, scalability, performance, security, auditability, reliability and maintainability."
    ),

    paragraph(
        "The project brief required the use of Generative AI tools to streamline requirements gathering and test planning, JavaScript and Faker-style synthetic data generation for KYC and AML testing, JavaScript-based test-case development, RTM generation, and Jest-based test execution."
    )
);

// ------------------------------------------------------------
// 3. PROJECT OBJECTIVES
// ------------------------------------------------------------

children.push(
    heading("3. Project Objectives"),

    bullet("Create a comprehensive and testable requirements baseline."),
    bullet("Convert requirements into Agile epics and user stories."),
    bullet("Estimate and prioritize user stories using story points."),
    bullet("Organize the backlog into planned sprints."),
    bullet("Generate realistic synthetic KYC and AML test data."),
    bullet("Create structured software test cases and scenarios."),
    bullet("Automate test execution using Jest."),
    bullet("Map requirements, test cases and execution results through the RTM."),
    bullet("Generate structured project and test execution reports."),
    bullet("Evaluate the practical contribution and limitations of Generative AI.")
);

// ------------------------------------------------------------
// 4. PROJECT SCOPE
// ------------------------------------------------------------

children.push(
    heading("4. Project Scope"),

    bullet("AI-powered customer chatbot."),
    bullet("Natural-language understanding and intent identification."),
    bullet("KYC information collection and validation."),
    bullet("AML transaction monitoring and alert generation."),
    bullet("Integration with banking and customer systems."),
    bullet("Synthetic KYC and AML data."),
    bullet("Security and audit requirements."),
    bullet("Scalability and performance requirements."),
    bullet("Reliability and maintainability."),
    bullet("Quality engineering and automated Jest testing.")
);

// ------------------------------------------------------------
// 5. GENERATIVE AI APPROACH
// ------------------------------------------------------------

children.push(
    heading("5. Generative AI Approach"),

    paragraph(
        "Generative AI was used as an accelerator rather than as a replacement for testing judgment. Candidate requirements, user stories, acceptance criteria, test scenarios and documentation were generated through structured prompts and then reviewed before being incorporated into project artifacts."
    ),

    paragraph("Key areas where Generative AI contributed:"),

    bullet("Requirements ideation and structuring."),
    bullet("Functional and non-functional requirement classification."),
    bullet("Epic and user-story decomposition."),
    bullet("Acceptance-criteria generation."),
    bullet("Story-point and prioritization suggestions."),
    bullet("Test-case and scenario generation."),
    bullet("Synthetic data design."),
    bullet("RTM and report-generation logic."),
    bullet("Project documentation and final analysis.")
);

// ------------------------------------------------------------
// 6. REQUIREMENTS ENGINEERING
// ------------------------------------------------------------

children.push(
    heading("6. Requirements Engineering"),

    paragraph(
        "The requirements baseline was created as the foundation for the remaining project deliverables. The requirements covered chatbot functionality, NLP capabilities, KYC, AML, integration, scalability, performance, security, auditability, reliability and maintainability."
    ),

    paragraph(
        "The baseline contained 20 functional requirements and 10 non-functional requirements, together with 8 AI/NLP requirements. The requirements were assigned unique identifiers and priorities to support traceability and Agile planning."
    ),

    paragraph("Representative requirement areas include:"),

    bullet("FR-001: AI-powered chatbot for customer interaction."),
    bullet("FR-002: Natural-language customer queries."),
    bullet("FR-004 to FR-008: KYC collection, validation, records and synthetic data."),
    bullet("FR-009 to FR-013: AML risk detection, alerts and review."),
    bullet("FR-014 to FR-016: Existing-system integration."),
    bullet("FR-017 to FR-020: Scalability and performance."),
    bullet("NFR-001 to NFR-010: Security, auditability, performance, reliability and maintainability."),
    bullet("AI-001 to AI-008: NLP interpretation, intent identification, information extraction, contextual responses and AI-response evaluation.")
);

// ------------------------------------------------------------
// 7. EPICS AND USER STORIES
// ------------------------------------------------------------

children.push(
    heading("7. Agile Epics and User Stories"),

    paragraph(
        "The requirements were decomposed into eight Agile epics and 34 user stories. Requirement identifiers were retained so that the backlog could later feed the RTM without changing the traceability chain."
    ),

    makeTable(
        ["Epic ID", "Epic", "Stories", "Story Points", "Primary Sprint"],
        epics
    ),

    paragraph(
        "The largest functional areas were the AI Customer Chatbot, AML Monitoring, KYC Management, Banking System Integration, Security & Audit, Scalability & Performance, Reliability & Maintainability, and Quality Engineering & Test Automation."
    )
);

// ------------------------------------------------------------
// 8. STORY POINT ESTIMATION
// ------------------------------------------------------------

children.push(
    heading("8. Story Point Estimation"),

    paragraph(
        "A Fibonacci-style estimation scale of 1, 2, 3, 5 and 8 was used. Larger items were intended to be decomposed during refinement. Story points represented relative complexity and effort rather than direct hours."
    ),

    paragraph(
        "Generative AI was used to provide estimation suggestions and identify potentially large or complex stories. Final decisions remained subject to Test Manager review."
    ),

    paragraph("Examples:"),

    bullet("US-01-05 — Contextually relevant chatbot responses: 8 points."),
    bullet("US-02-04 — Maintaining verified KYC records: 8 points."),
    bullet("US-03-03 — Identifying suspicious transaction patterns: 8 points."),
    bullet("US-04-03 — Handling temporary integration failures: 8 points."),
    bullet("US-05-01 — Protecting sensitive KYC information: 8 points.")
);

// ------------------------------------------------------------
// 9. PRIORITIZATION
// ------------------------------------------------------------

children.push(
    heading("9. Prioritization"),

    paragraph(
        "Prioritization separated Must Have requirements from Should Have requirements. Core banking, compliance, security and mandatory testing capabilities were treated as Must Have items, while supporting capabilities such as scalability, maintainability and additional testing coverage were generally treated as Should Have items."
    ),

    bullet("Must Have — essential platform or compliance capability."),
    bullet("Should Have — important supporting or enhancement capability."),
    bullet("Traceability was retained across requirements, stories and tests."),
    bullet("Acceptance criteria were written to support later conversion into executable tests.")
);

// ------------------------------------------------------------
// 10. SPRINT PLANNING
// ------------------------------------------------------------

children.push(
    heading("10. Sprint Planning"),

    paragraph(
        "The project was organized into four illustrative two-week sprints. Sprint allocation was designed around dependencies and logical delivery increments."
    ),

    makeTable(
        ["Sprint", "Focus", "Stories", "Story Points"],
        sprints
    ),

    paragraph(
        "Sprint 1 established the AI chatbot, NLP foundation and requirements traceability. Sprint 2 focused on KYC management, synthetic KYC data and core integration. Sprint 3 focused on AML monitoring, synthetic AML data and integration resilience. Sprint 4 addressed security, audit, scalability, performance, reliability and test automation."
    )
);

// ------------------------------------------------------------
// 11. SYNTHETIC KYC DATA
// ------------------------------------------------------------

children.push(
    heading("11. Synthetic KYC Data"),

    paragraph(
        "Synthetic KYC data was designed to provide realistic but non-production records for testing. The requirements specified fields including Customer ID, Full Name, Date of Birth, Gender, Email, Phone Number, Address, City/State/Postal Code, Identification Type, Identification Number, KYC Status and Customer Risk Category."
    ),

    paragraph(
        "The dataset was intended to contain valid, invalid, incomplete and boundary-oriented records so that different validation paths could be exercised."
    ),

    bullet("Valid KYC records."),
    bullet("Incomplete records."),
    bullet("Invalid identification data."),
    bullet("Different KYC statuses."),
    bullet("Different customer-risk categories."),
    bullet("Boundary-oriented test records.")
);

// ------------------------------------------------------------
// 12. SYNTHETIC AML DATA
// ------------------------------------------------------------

children.push(
    heading("12. Synthetic AML Data"),

    paragraph(
        "Synthetic AML transaction data was generated to simulate both normal and potentially suspicious banking activity. The scope included transaction identifiers, customer identifiers, sender and receiver information, transaction amounts, transaction types, dates, accounts, countries, transaction frequency, risk scores, AML scenarios and alert status."
    ),

    paragraph("The initial AML scenarios included:"),

    bullet("High-value transactions."),
    bullet("Multiple transactions within a short period."),
    bullet("Rapid movement of funds."),
    bullet("Unusual transaction amounts."),
    bullet("High-frequency transactions."),
    bullet("Cross-border transactions."),
    bullet("Multiple-recipient activity."),
    bullet("Normal or low-risk transactions.")
);

// ------------------------------------------------------------
// 13. TEST STRATEGY
// ------------------------------------------------------------

children.push(
    heading("13. Test Strategy"),

    paragraph(
        "The testing approach combined scenario-based test design with automated JavaScript execution using Jest. The objective was to validate chatbot/NLP behavior, KYC processing, AML behavior, integration behavior, consistency and selected quality-engineering requirements."
    ),

    paragraph("The testing lifecycle was:"),

    numbered("Review and baseline requirements."),
    numbered("Create Agile stories and acceptance criteria."),
    numbered("Generate synthetic test data."),
    numbered("Create test scenarios and test cases."),
    numbered("Implement executable Jest tests."),
    numbered("Execute the test suite."),
    numbered("Analyze failures and correct implementation/test expectations."),
    numbered("Generate execution reporting."),
    numbered("Map results into the RTM.")
);

// ------------------------------------------------------------
// 14. JEST AUTOMATION
// ------------------------------------------------------------

children.push(
    heading("14. Jest Automation"),

    paragraph(
        "Jest was selected as the JavaScript testing framework for automated unit and integration-style testing. The project configuration enabled test execution and coverage reporting."
    ),

    paragraph(
        "The test suite was organized into separate areas including KYC, AML/synthetic-data validation, chatbot/NLP behavior and integration testing."
    ),

    paragraph(
        "During development, a chatbot test initially failed because the mocked chatbot returned the generic intent \"KYC\" while the test expected the more specific \"KYC_UPDATE\" intent. The mock behavior was corrected so that the test suite aligned with the intended intent-classification behavior."
    ),

    paragraph(
        "After the correction, the chatbot test suite completed successfully with 9/9 tests passing."
    )
);

// ------------------------------------------------------------
// 15. TEST EXECUTION RESULTS
// ------------------------------------------------------------

children.push(
    heading("15. Test Execution Results"),

    makeTable(
        ["Metric", "Result"],
        [
            ["Total Tests Executed", testResults.total],
            ["Passed", testResults.passed],
            ["Failed", testResults.failed],
            ["Pass Percentage", testResults.passPercentage],
            ["Framework", "Jest"],
            ["Execution Status", "Successful"]
        ]
    ),

    paragraph(
        "The final test execution report generated by the project contained 35 executed tests, all of which passed. This provided a 100% pass rate for the implemented and executed test set."
    ),

    paragraph(
        "The result should be interpreted as the pass rate of the implemented automated suite and not as proof that every requirement in the complete requirements baseline was fully exercised by automation."
    )
);

// ------------------------------------------------------------
// 16. DEFECT IDENTIFICATION AND RESOLUTION
// ------------------------------------------------------------

children.push(
    heading("16. Defect Identification and Resolution"),

    paragraph(
        "During Jest execution, the chatbot test TC-CHAT-003 identified a mismatch between the expected intent and the returned mock intent."
    ),

    makeTable(
        ["Item", "Observed"],
        [
            ["Test Case", "TC-CHAT-003"],
            ["Expected", "KYC_UPDATE"],
            ["Received", "KYC"],
            ["Result", "Failed"],
            ["Resolution", "Updated chatbot mock classification logic"],
            ["Final Result", "Passed"]
        ]
    ),

    paragraph(
        "This demonstrates the value of automated testing in identifying inconsistencies between expected behavior and the implemented test double. After correction, the complete chatbot suite passed."
    )
);

// ------------------------------------------------------------
// 17. RTM
// ------------------------------------------------------------

children.push(
    heading("17. Requirements Traceability Matrix"),

    paragraph(
        "The RTM was generated programmatically to connect requirements with test cases and execution status. Requirement identifiers were preserved from the requirements specification into the Agile backlog and testing artifacts."
    ),

    paragraph(
        "Examples of traceability included FR-019 for response-time expectations, FR-020 for performance testing using representative synthetic data, NFR-001 for protection of sensitive KYC information, NFR-004 for audit information, and AI requirements for chatbot interpretation, intent identification, information extraction and response behavior."
    ),

    paragraph(
        "The RTM therefore provides a structured relationship between requirements, Agile stories, test scenarios, execution evidence and final reporting."
    )
);

// ------------------------------------------------------------
// 18. QUALITY COVERAGE
// ------------------------------------------------------------

children.push(
    heading("18. Security, Performance, Reliability and Quality Coverage"),

    paragraph(
        "The requirements baseline included security, auditability, scalability, performance, reliability and maintainability requirements. These areas were intentionally represented in the Agile backlog so that they could be planned and traced."
    ),

    bullet("Security: protection of sensitive customer and KYC information."),
    bullet("Role-based access control."),
    bullet("Confidentiality and integrity."),
    bullet("Audit records for important KYC and AML activities."),
    bullet("Concurrent customer interactions."),
    bullet("Increasing customer and transaction volumes."),
    bullet("Response-time expectations."),
    bullet("Graceful recovery from temporary service failures."),
    bullet("Consistent results for identical valid inputs."),
    bullet("Maintainability of KYC and AML rules.")
);

// ------------------------------------------------------------
// 19. SPRINT EXECUTION AND MONITORING
// ------------------------------------------------------------

children.push(
    heading("19. Sprint Execution and Progress Monitoring"),

    paragraph(
        "Sprint execution was supported by maintaining traceability between the requirements baseline, backlog, synthetic data, test cases, automated tests, RTM and execution report."
    ),

    paragraph(
        "Progress was assessed through completion of generated artifacts and automated test results. The test execution report provided an objective measurement of the implemented test suite, while the RTM provided requirement-level visibility."
    )
);

// ------------------------------------------------------------
// 20. SPRINT REVIEW AND ADJUSTMENT
// ------------------------------------------------------------

children.push(
    heading("20. Sprint Review and Adjustment"),

    paragraph(
        "The project was designed to allow sprint planning to be reviewed and adjusted based on testing outcomes, dependencies and implementation findings."
    ),

    paragraph(
        "The chatbot test failure is an example of feedback from execution being used to correct the implementation before final reporting. Similarly, the separation of AML, KYC, integration and quality-engineering work into different sprint areas allowed the project to manage dependencies progressively."
    )
);

// ------------------------------------------------------------
// 21. CHALLENGES
// ------------------------------------------------------------

children.push(
    heading("21. Challenges Encountered and Resolutions"),

    makeTable(
        ["Challenge", "Resolution"],
        [
            ["Incorrect chatbot intent returned by mock", "Reviewed the failing assertion and corrected the mock classification logic."],
            ["Package installation issue caused by incorrect package name", "Corrected the npm command and installed the required dependency."],
            ["Need for repeatable test execution", "Implemented Jest-based automated tests."],
            ["Need for requirement-to-test visibility", "Generated an RTM using JavaScript automation."],
            ["Need for realistic but safe test data", "Used synthetic KYC and AML datasets rather than real customer information."],
            ["Large number of project artifacts", "Used programmatic report generation to standardize output."]
        ]
    )
);

// ------------------------------------------------------------
// 22. TEAM / RESOURCE CONFLICT RESOLUTION
// ------------------------------------------------------------

children.push(
    heading("22. Team and Resource Conflict Resolution"),

    paragraph(
        "The project brief specifically requires consideration of conflict resolution arising from team members leaving the project. The available project artifacts do not provide evidence of a specific named team-member departure or a documented real incident."
    ),

    paragraph(
        "Therefore, the appropriate project-management response is treated as a contingency approach rather than a claimed historical event."
    ),

    bullet("Re-prioritize Must Have stories."),
    bullet("Protect compliance, security and core testing work."),
    bullet("Redistribute remaining stories among available resources."),
    bullet("Defer lower-priority Should Have items where necessary."),
    bullet("Review sprint capacity before committing additional work."),
    bullet("Continue monitoring execution and adjust the backlog based on capacity.")
);

// ------------------------------------------------------------
// 23. CRITICAL ANALYSIS
// ------------------------------------------------------------

children.push(
    heading("23. Critical Analysis"),

    paragraph(
        "Generative AI significantly reduced the effort required to produce structured project artifacts. It was particularly useful for transforming broad project objectives into candidate requirements, user stories, acceptance criteria and test scenarios."
    ),

    paragraph(
        "However, AI-generated outputs required human validation. The chatbot test failure illustrates why generated content should not be accepted without execution-based verification. A generated test can be syntactically correct while still containing an incorrect expectation."
    ),

    paragraph(
        "The strongest benefit of the approach was the continuity of traceability. Requirement identifiers were retained through the backlog and testing lifecycle, making it easier to connect business expectations with technical test evidence."
    ),

    paragraph(
        "The automated Jest suite also provided measurable evidence of the final implemented test set. The 100% pass rate demonstrates that the executed tests were passing, but it should not be interpreted as complete validation of all 38 baseline requirements."
    )
);

// ------------------------------------------------------------
// 24. LIMITATIONS
// ------------------------------------------------------------

children.push(
    heading("24. Project Limitations"),

    bullet("The project uses synthetic rather than production banking data."),
    bullet("The Jest suite represents the implemented automated scope rather than every requirement."),
    bullet("Performance expectations are represented in the requirements and backlog, but a full production-scale load test is outside the demonstrated Jest execution."),
    bullet("Security requirements are represented in the requirements and backlog but should receive dedicated security testing in a production environment."),
    bullet("Generative AI output still requires human review and execution-based validation."),
    bullet("The sprint schedule is an illustrative four-sprint plan as defined in the Agile planning artifact.")
);

// ------------------------------------------------------------
// 25. LESSONS LEARNED
// ------------------------------------------------------------

children.push(
    heading("25. Lessons Learned"),

    bullet("Generative AI is most effective when used as an accelerator with human review."),
    bullet("Clear requirement identifiers improve end-to-end traceability."),
    bullet("Acceptance criteria should be written with future automation in mind."),
    bullet("Synthetic data allows realistic testing without depending on real customer information."),
    bullet("Automated tests provide objective evidence of implementation behavior."),
    bullet("Failures should be investigated rather than simply removed or ignored."),
    bullet("Programmatic report generation improves consistency across project deliverables."),
    bullet("Sprint planning should remain adaptable to execution feedback and resource constraints.")
);

// ------------------------------------------------------------
// 26. CONCLUSION
// ------------------------------------------------------------

children.push(
    heading("26. Conclusion"),

    paragraph(
        "The project successfully demonstrated a Generative AI-assisted software testing workflow for an AI-driven KYC and AML banking platform. The workflow progressed from requirements engineering through Agile decomposition, synthetic-data generation, test-case development, Jest automation, RTM mapping and final reporting."
    ),

    paragraph(
        `The final automated execution produced ${testResults.total} tests with ${testResults.passed} passing and ${testResults.failed} failing, resulting in a ${testResults.passPercentage} pass rate for the implemented test suite.`
    ),

    paragraph(
        "The project demonstrates that Generative AI can improve the speed and structure of software testing activities when combined with human review, clear traceability and executable validation. The overall approach provides a practical foundation for extending the framework with broader security, performance, integration and production-scale testing."
    )
);

// ------------------------------------------------------------
// 27. PROJECT DELIVERABLE SUMMARY
// ------------------------------------------------------------

children.push(
    heading("27. Final Deliverable Summary"),

    makeTable(
        ["Deliverable", "Status"],
        [
            ["Requirements Specification", "Completed"],
            ["Epics and User Stories", "Completed"],
            ["Story Point Estimation", "Completed"],
            ["Sprint Planning", "Completed"],
            ["Synthetic KYC Data", "Completed"],
            ["Synthetic AML Data", "Completed"],
            ["Test Scenarios / Test Cases", "Completed"],
            ["Jest Automated Testing", "Completed"],
            ["RTM", "Completed"],
            ["Test Execution Report", "Completed"],
            ["Final Project Report", "Generated"]
        ]
    ),

    paragraph(
        "Overall, the project deliverables establish a connected testing lifecycle from requirements definition to automated execution and final reporting."
    )
);

// ============================================================
// DOCUMENT
// ============================================================

const doc = new Document({
    creator: project.organization,
    title: "Final Project Report - GenAI in Software Testing",
    description: "Final report for the AI-driven KYC and AML banking platform testing project.",
    sections: [
        {
            properties: {
                page: {
                    margin: {
                        top: 720,
                        bottom: 720,
                        left: 900,
                        right: 900
                    }
                }
            },
            children
        }
    ],
    numbering: {
        config: [
            {
                reference: "numbered-list",
                levels: [
                    {
                        level: 0,
                        format: "decimal",
                        text: "%1.",
                        alignment: AlignmentType.LEFT
                    }
                ]
            }
        ]
    }
});

// ============================================================
// SAVE
// ============================================================

Packer.toBuffer(doc)
    .then(buffer => {
        fs.writeFileSync(OUTPUT_FILE, buffer);

        console.log("");
        console.log("==============================================");
        console.log("FINAL PROJECT REPORT CREATED SUCCESSFULLY");
        console.log("==============================================");
        console.log(`File: ${OUTPUT_FILE}`);
        console.log("");
        console.log("Test execution summary:");
        console.log(`Total tests: ${testResults.total}`);
        console.log(`Passed: ${testResults.passed}`);
        console.log(`Failed: ${testResults.failed}`);
        console.log(`Pass percentage: ${testResults.passPercentage}`);
        console.log("");
    })
    .catch(error => {
        console.error("Error creating Final Project Report:", error);
    });