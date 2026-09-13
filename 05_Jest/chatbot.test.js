// =====================================================
// CHATBOT / NLP JEST TESTS
// =====================================================
// These tests use mocked chatbot/NLP functions because
// this project does not contain a live AI chatbot API.
// =====================================================


// -----------------------------------------------------
// Mock chatbot response function
// -----------------------------------------------------

function mockChatbot(message) {

    const text = message.toLowerCase();

    // Check specific intents BEFORE general KYC intent
    if (
        text.includes("update") &&
        text.includes("kyc")
    ) {

        return {
            intent: "KYC_UPDATE",
            response:
                "You can update your KYC details through the customer verification process."
        };

    }

    if (text.includes("kyc")) {

        return {
            intent: "KYC",
            response:
                "You can complete your KYC by submitting the required identity information."
        };

    }

    return {
        intent: "UNKNOWN",
        response:
            "I'm not sure I understood your request. Please provide more details."
    };
}


// -----------------------------------------------------
// Mock entity extraction
// -----------------------------------------------------

function extractCustomerId(message) {

    const match = message.match(
        /CUST-\d{5}/i
    );

    return match
        ? match[0].toUpperCase()
        : null;
}


// -----------------------------------------------------
// CHATBOT TEST SUITE
// -----------------------------------------------------

describe("AI Chatbot and NLP Tests", () => {


    // ===================================================
    // TC-CHAT-001
    // FR-001
    // ===================================================

    test(
        "TC-CHAT-001: Chatbot should accept a customer message",
        () => {

            const result =
                mockChatbot("Hello");

            expect(result).toHaveProperty(
                "response"
            );

            expect(result.response).toBeTruthy();

        }
    );


    // ===================================================
    // TC-CHAT-002
    // FR-002
    // ===================================================

    test(
        "TC-CHAT-002: Chatbot should understand a KYC query",
        () => {

            const result =
                mockChatbot(
                    "How can I complete my KYC?"
                );

            expect(result.intent).toBe(
                "KYC"
            );

            expect(result.response).toContain(
                "KYC"
            );

        }
    );


    // ===================================================
    // TC-CHAT-003
    // AI-002
    // ===================================================

    test(
        "TC-CHAT-003: Chatbot should identify KYC update intent",
        () => {

            const result =
                mockChatbot(
                    "I want to update my KYC details"
                );

            expect(result.intent).toBe(
                "KYC_UPDATE"
            );

        }
    );


    // ===================================================
    // TC-CHAT-004
    // AI-003
    // ===================================================

    test(
        "TC-CHAT-004: NLP should extract customer ID",
        () => {

            const message =
                "My customer ID is CUST-00001.";

            const customerId =
                extractCustomerId(message);

            expect(customerId).toBe(
                "CUST-00001"
            );

        }
    );


    // ===================================================
    // TC-CHAT-005
    // FR-003
    // ===================================================

    test(
        "TC-CHAT-005: Chatbot should provide a relevant KYC response",
        () => {

            const result =
                mockChatbot(
                    "What is the KYC process?"
                );

            expect(result.intent).toBe(
                "KYC"
            );

            expect(
                result.response.toLowerCase()
            ).toContain("kyc");

        }
    );


    // ===================================================
    // TC-CHAT-006
    // AI-005
    // ===================================================

    test(
        "TC-CHAT-006: Equivalent KYC queries should produce the same intent",
        () => {

            const queryOne =
                mockChatbot(
                    "How can I complete my KYC?"
                );

            const queryTwo =
                mockChatbot(
                    "Tell me about the KYC process."
                );

            expect(
                queryOne.intent
            ).toBe(
                queryTwo.intent
            );

        }
    );


    // ===================================================
    // TC-CHAT-007
    // AI-006
    // ===================================================

    test(
        "TC-CHAT-007: Unclear query should return a fallback response",
        () => {

            const result =
                mockChatbot(
                    "asdf xyz unknown request"
                );

            expect(result.intent).toBe(
                "UNKNOWN"
            );

            expect(
                result.response
            ).toContain(
                "not sure"
            );

        }
    );


    // ===================================================
    // TC-CHAT-008
    // AI-007
    // ===================================================

    test(
        "TC-CHAT-008: Unsupported request should not be treated as a KYC request",
        () => {

            const result =
                mockChatbot(
                    "Tell me a joke about football."
                );

            expect(result.intent).not.toBe(
                "KYC"
            );

            expect(result.intent).toBe(
                "UNKNOWN"
            );

        }
    );


    // ===================================================
    // TC-CHAT-009
    // AI-008
    // ===================================================

    test(
        "TC-CHAT-009: Same input should produce a consistent chatbot intent",
        () => {

            const message =
                "How can I complete my KYC?";

            const resultOne =
                mockChatbot(message);

            const resultTwo =
                mockChatbot(message);

            expect(
                resultOne.intent
            ).toBe(
                resultTwo.intent
            );

            expect(
                resultOne.response
            ).toBe(
                resultTwo.response
            );

        }
    );

});