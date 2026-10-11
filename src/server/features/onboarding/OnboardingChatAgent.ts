import { DurableObject } from "cloudflare:workers";

// Retain existing conversations without opening or migrating their storage.
export class OnboardingChatAgent extends DurableObject {}
