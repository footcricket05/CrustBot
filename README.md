# CrustBot: Crustdata API Chatbot Challenge

This project was built as part of the **Crustdata API Chatbot Challenge**, where I developed a chatbot named CrustBot that assists users in querying Crustdata's APIs. The chatbot was designed and implemented incrementally through multiple levels of functionality, as outlined below. 🚀

---

## 🏗️ Project Levels and Features

### Level 0: Basic Static Chat 💬
- Implemented a basic chat interface where users can ask questions about Crustdata's APIs.
- The chatbot provides accurate technical answers based on the API documentation.
- Examples of supported queries include:
  - Searching for people by title, company, and location.
  - Understanding API error responses and resolving issues.
- **Status:** ✅ Completed and deployed.

### Level 1: Agentic Behavior 🤖
- Validates API request examples before sharing them with the user.
- Automatically checks for errors in API requests and suggests corrections.
- Supports conversational mode, allowing users to ask follow-up questions within the same thread.
- **Status:** ✅ Implemented and functional.

### Level 2: Enhanced Knowledge Base 📚
- Added the ability to ingest and integrate additional knowledge bases, including:
  - Questions and answers from Crustdata’s support Slack channels.
  - Updated API documentation.
  - Additional resources to improve chatbot accuracy.
- **Status:** ✅ Integrated.

### Level 3: Slack Integration 💼
- Integrated the chatbot into Slack as a Slack bot:
  - Works within specific channels.
  - Accessible to designated users only.
  - Drafts responses for messages in real-time.
- **Status:** ✅ Fully functional Slack bot deployed.

---

## 🔗 Project Repository
The complete code for this project is available on my GitHub:
[Crustdata Chatbot Repository](https://github.com/footcricket05/CrustBot)

---

## 📜 Appendix: Example Questions and Answers

### Example 1: Searching for People by Criteria
**Question:**
"How do I search for people given their current title, current company, and location?"

**Answer:**
Use the endpoint `api.crustdata.com/screener/person/search`. Here’s a sample cURL request:
```bash
curl --location 'https://api.crustdata.com/screener/person/search' \
--header 'Content-Type: application/json' \
--header 'Authorization: Token $token' \
--data '{
   "filters": [
       {
           "filter_type": "CURRENT_COMPANY",
           "type": "in",
           "value": [
               "openai.com"
           ]
       },
       {
           "filter_type": "CURRENT_TITLE",
           "type": "in",
           "value": [
               "engineer"
           ]
       },
       {
           "filter_type": "REGION",
           "type": "in",
           "value": [
               "San Francisco, California, United States"
           ]
       }        
   ],
   "page": 1
}'
```

### Example 2: Handling API Errors
**Question:**
"I get an error when using the region filter. How should I format my input?"

**Answer:**
Ensure that the region value matches one of the supported options from the list here:
[Updated Region Values](https://crustdata-docs-region-json.s3.us-east-2.amazonaws.com/updated_regions.json).

---

## 📞 Contact
For any queries, feel free to reach out via [LinkedIn](https://linkedin.com/in/shaurya-srinet) or open an issue on the repository.

---

Thank you for reviewing my project! 😊

