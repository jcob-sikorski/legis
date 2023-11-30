import { ChatCompletionTool } from "openai/resources/index.mjs"

export let function_description: ChatCompletionTool[] = [
  {
    "type": "function",
    "function": {
      "name": "generate_sections_text",
      "description": "Generates legal firm's website text for each section.",
      "parameters": {
        "type": "object",
        "properties": {
          "NavBar": {
            "type": "string",
            "description": "Law Firm Name",
          },
          "Hero": {
            "type": "object",
            "properties": {
              "headline": {
                "description": "Law Firm Name",
                "type": "string",
              },
              "subHeadline": {
                "description": "One Sentence Description",
                "type": "string",
              }
            }
          },
          "PracticeAreas": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "practiceAreaName": {
                  "description": "Specialized Practice Area Name",
                  "type": "string",
                },
                "practiceDescription": {
                  "description": "Short description of a practice area, easy to understand and professional",
                  "type": "string",
                }
              }
            }
          },
          "OurTeam": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "description": "Full name of the team member",
                  "type": "string",
                },
                "description": {
                  "description": "Short description of the team member, easy to understand and professional",
                  "type": "string",
                }
              }
            },
          },
          "OurValues": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "description": "Full name of the value from OurValues",
                  "type": "string",
                },
                "description": {
                  "description": "Short description of the value, easy to understand and professional - don’t mention the full name of the value",
                  "type": "string",
                }
              }
            },
          },
          "AboutUs": {
            "type": "string",
            "description": "Two exceptional sentences based on Firm Strengths",
          },
        },
        "required": ["NavBar", "Hero", "PracticeAreas", "OurTeam", "OurValues", "AboutUs"],
      },
    }
  }
]