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
                "description": "Main Practice Area",
                "type": "string",
              },
              "subHeadline": {
                "description": "Eye-catching One Sentence Description of the company",
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
                  "description": "Short description of a practice area",
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
                "memberName": {
                  "description": "Full name of the team member",
                  "type": "string",
                },
                "details": {
                  "description": "Short description of the team member",
                  "type": "string",
                }
              }
            },
          },
          "TheirValues": {
            "type": "string",
            "description": "Short eye-catching snippet based on Stand Out Factor, Firm Representation and Important Values",
          },
          "ReviewsAndTestimonials": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "clientName": {
                  "description": "Name of the client",
                  "type": "string",
                },
                "testimonial": {
                  "description": "Testimonial from a client",
                  "type": "string",
                }
              }
            },
          },
          "AboutUs": {
            "type": "string",
            "description": "Short eye-catching snippet based on Firm Strengths",
          },
        },
        "required": ["NavBar", "Hero", "Practice areas", "Our Team", "Their values", "Reviews and Testimonials", "About us"],
      },
    }
  }
]