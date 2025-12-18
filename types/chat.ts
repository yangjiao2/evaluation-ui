export interface Message {
  role: Role;
  content: string;
  attachment?: Attachment | '' | null | undefined;
  statusContent?: string;
  isStatusComplete?: boolean;
  id?: string;
  followup?: {
    content?: string[],
    maxCount?: number
  },
  agentDetails?: any
}

export interface Attachment {
  name: string;
  extension: string;
  content: string;
  type: string;
}

export type Role = 'assistant' | 'user' | 'agent' | 'system';

export interface ChatBody {
  model: string;
  system?: string;
  prompt: string;
  authToken?: string | null;
  botName?: string,
  userName: string,
  sessionId: string | null,
  queryId?: string,
  options?: 
    { temperature: number },
  attachment?: Attachment | '' | null | undefined,
  dlCheck: boolean
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  model: string;
  prompt: string;
  temperature: number;
  folderId: string | null;
}
