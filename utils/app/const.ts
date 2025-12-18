
export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "";


export const DEFAULT_TEMPERATURE = 
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "1");

export const nextEndPoints = {
  chat: 'api/chat',
  feedback: 'api/feedback',
  irqa: 'api/irqa',
  saveconversation: 'api/saveconversation',
  botconfig: 'api/botconfig'
};  

export const Constants = {
  "DOMAIN": {
      "EXPANSION": "expansions",
      "GITLAB": "gitlab",
      "JIRA": "jira",
      "RECOMMENDATIONS": "recommendations",
      "ITSM": "it_service_management",
      "NVBUGS": "nvbugs",
      "REDMINE": "redmine",
      "CUSTOM_RESPONSE": "slack"
  },
  "PlatformModelSelection": {
      "GPT-4": "GPT-4",
      "mixtral": "Mixtral",
      "llama-2-70b-chat-hf": "llama-2-70b-chat-hf (experimental)",
      "gpt-43b-905": "NeMo gpt-43b-905 (experimental)"
  },
  "PlatformAgentSelection": {
      "DEFAULT": "nvhelp",
      "NVBOT_BETA": "nvbot_beta",
      "SALESFORCE": "salesforce",
      "NVBOT_EA": "nvbot_ea",
      "NVHELP":"nvhelp",
      "SCOUT": "scout",
      "SLT": "slt",
      "AVC": "avc",
      "NAUTOBOT": "nautobot",
      "SALES": "Sales",
      "NVHELP_CONFLUENCE": "nvhelp_confluence",
      "ECS": "ecs",
      "NVHELP_SHAREPOINT_CONFLUENCE": "nvhelp_sharepoint_confluence"
  },
  "INTENT": {
      "GITLAB": "gitlab.expansions",
      "JIRA": "jira.item_detected.single_ticket",
      "JIRA_OLD": "jira.item_detected",
      "PROSPERO_RECO": "recommendations.prospero",
      "ITSM_TICKET": "it_service_management.expansions.ticket",
      "CREATE_TICKET": "it_service_management.description",
      "CREATE_REQUEST": "it_service_management.request_description",
      "UPDATE_TICKET": "it_service_management.comment",
      "CLOSE_TICKET": "it_service_management.close_ticket_submit",
      "REOPEN_TICKET": "it_service_management.reopen_ticket_submit",
      "KB_EXPANSION": "it_service_management.expansions.kb",
      "NVBUGS": "nvbugs.expansions",
      "ITSM_URL": "it_service_management.expansions.ticket_url",
      "GITLAB_DETAILS": "gitlab.item_detected",
      "JIRA_DETAILS": "jira.item_detected.single_ticket",
      "JIRA_MULTI_TICKET": "jira.expansions.multi_ticket",
      "KB_DETAILS": "it_service_management.kb_item_detected",
      "NVBUGS_DETAILS": "nvbugs.item_detected",
      "ITSM_URL_DETAILS": "it_service_management.ticket_url_detected",
      "REDMINE_DETAILS": "redmine.item_detected",

      "CANCEL": "custom.cancel",
      "CUSTOM_RESPONSE": "custom_response",
      "LIVE_AGENT.CHAT_REQUESTED": "live_agent.chat_requested",
      "LIVE_AGENT.CHAT_UNAVAILABLE": "live_agent.chat_unavailable",
      "LIVE_AGENT.CHAT_ACCEPTED": "live_agent.chat_accepted",
      "LIVE_AGENT.CHAT_ENDED": "live_agent.chat_ended"
  },
  "FEEDBACK": {
      "GOOD": "Good",
      "BAD": "Bad"
  },
  "BOT_MODE":{
      "BOT": "bot",
      "TRANSITION": "transition",
      "LIVE_AGENT": "livesupport"
  },
  "ROLES": {
    "ASSISTANT": "assistant",
    "SYSTEM": "system",
    "AGENT": "agent",
    "USER": "user"
  },
  "ATTACHMENT_TYPES": {
    "IMAGE": "image",
    "TEXT": "text",
    "PDF": "pdf",
    "AUDIO": "audio",
    "VIDEO": "video"
  },
 
  "MAX_RETRIES": 2,
  "HELIOS_BASE_URL": "https://helios.nvidia.com/",
  "HELIOS_URL": "https://helios.nvidia.com/user/",
  "REDMINE_URL": "https://redmine.mellanox.com/issues/",
  "WELCOME_MESSAGE_PRIVACY_LINK": "https://confluence.nvidia.com/pages/viewpage.action?pageId=1974285997",

  "API_END_POINTS": {
    "WEBCLIENT_URL": "/botmaker/processrequest",
    "IRQA_URL": "/botmaker/irqaresponse",
    "FEEDBACK_URL": "/utilities/savefeedback",
    "SAVE_CONVERSATION": "/utilities/saveuserconversation",
    "BOT_CONFIG": "/bot/config",
    "EVALUATION": "/evaluation"
  },
  "ERROR_MESSAGE": "I seem to be having a problem. Please try again in a while.",
  "NETWORK_ERROR_MESSAGE": "I timed out waiting for a response from the Mixtral LLM model on AI Playground.",
  "UNAUTHORIZED_ERROR_MESSAGE": "Authorization failed due to invalid access token, please refresh and try again.",
  "FORBIDDEN_ERROR_MESSAGE": "Access is forbidden",

}

class DataConstants{
    static itsm = {
        "short_description_limit": 200,
        "description_limit": 2000,
        "comments_limit": 2000
    }
    static submit_text = "I want to submit the request"
    static pryon_category = {
        "catalog": "Catalog Item",
        "kb": "KB Article"
    }
    static PRYON_FALLBACK_TEXT = "I couldn't find an answer in my knowledgebase. You could try asking me another way."
    static CATEGORY = {
        "bot_exception": "BotException",
        "small_talk": "SmallTalk"
    }
    static request_a_feature_link = "https://jirasw.nvidia.com/secure/CreateIssue.jspa?issuetype=10001&pid=23316"
    static nv_bot_features_url = "https://confluence.nvidia.com/pages/viewpage.action?pageId=1237323673"
    static GITLAB_BASE_URL = "https://gitlab-master.nvidia.com/"
    static JIRA_BASE_URL = "https://jirasw.nvidia.com"
    static PROSPERO_TEXT = "prospero"
    static service_now_url = "https://nvidia.service-now.com/esc/"
    static NVBUGS_ITEM_URL = "https://nvbugswb.nvidia.com/"
    static DL_REQUEST_GROUP_SPECIFIC_URL = "https://dlrequest.nvidia.com/GroupID/Search/QuickSearch?searchValue"
    static DL_REQUEST_MEMBERSHIPS_URL = "https://dlrequest.nvidia.com/GroupID/Groups/MyMemberships"
    static DL_REQUEST_MY_GROUPS_URL = "https://dlrequest.nvidia.com/GroupID/Groups/MyGroups#MyGroups"
    static NVHUB_DEV_URL = "https://devbot.nvidia.com"
    static NVHUB_URL = "https://nvbot.nvidia.com"
    static CUSTOM_RESPONSE_DOCS_URL = "https://confluence.nvidia.com/display/NVBOT/Custom+auto-responses+for+your+channel"
    static CACHE_CONST = {
        "context": {
            "jira_bulk_update": "jira_bulk_update"
        },
        "jira_oauth_request_token": "jira_oauth_request_token",
        "jira_token": "jira_token",
        "bulk_jira_update": "bulk_jira_update"
    }
    static NETWORK_ERROR_MESSAGE = "I timed out waiting for a response from the Mixtral LLM model on AI Playground."
    static ERROR_MESSAGE = "I seem to be having a problem. Please try again in a while."
    static KNOWLEDGE_TEXT_TYPE = "knowledge_text_response"
    static KNOWLEDGE_KB_TYPE = "knowledge_kb_response"
    static LIST_GUIDED_CONVERSATION_TYPE = "list_guided_conversation_reponse"
    static PRYON_FALLBACK_INTENT = "knowledge.feedback.no"
    static PRYON_FALLBACK_BUTTON_TEXT = "Show more resources"
    static DISCLAIMER_URL = "https://confluence.nvidia.com/pages/viewpage.action?pageId=1974285997"
    static WELCOME_MESSAGE_PRIVACY_LINK = "https://confluence.nvidia.com/pages/viewpage.action?pageId=1974285997"
    static NVBOT_TEXT_PLACEHOLDER = "Unlock NVIDIA knowledge & expertise"
    static LIVE_AGENT_TEXT_PLACEHOLDER = "Write your message here"
    static WELCOME_MSG_DEFAULT = "I'm a generative AI bot for NVHelp. I can help answer questions from knowledge available in NVHelp. \nI can also help you connect with a live IT agent if you click the button above.\n\nAs an AI, I strive to deliver accurate responses but it's important to note that my answers may not always reflect truth.\n\nNow, how may I assist you today?"
    static NO_ACCESS_USER_MSG = `Thanks for coming by. NVBot 2.0 is in early access phase to a closed audience. To be add to the program queue, please use DLRequest to join [NVBot Early Access](https://dlrequest/GroupID/Groups/Properties?identity=YmM0OTM5ZTE0NjczNDYxYmFmNGJiNWJhNWU0NDVhODB8Z3JvdXA=).`
    static SENSITIVE_DISCLAIMER = "I have detected that this response may contain sensitive/confidential information. Please handle appropriately. "
    static SENSITIVE_DISCLAIMER_MORE_INFO = "https://confluence.nvidia.com/display/NVBOT/Sensitive+Info"
    static LIMITED_DISCLAIMER = "Search results used to generate the response were limited. "
    static LIMITED_DISCLAIMER_MORE_INFO = "https://confluence.nvidia.com/display/NVBOT/Limited+responses"
    static INITIAL_THOUGHT = ""
    static SCOUT_SUGGESTED_QUERY =  {
        "context": ["What was NVIDIA's gaming revenue in FY 2024 Q3?", "What was NVIDIA's earnings per share in FY 2024 Q3?", "What was NVIDIA's data center revenues in FY 2024 Q3?", "What was NVIDIA's automotive revenue in FY 2024 Q3?"],
    }
}

export default DataConstants