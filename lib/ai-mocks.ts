import type { Client, Job, Lead } from "@/lib/mock-data";

export type StructuredVoiceNote = {
  pets: string[];
  cleaningRequests: string[];
  houseBrainUpdates: string[];
};

export type StructuredWalkthrough = {
  clientProfile: string[];
  houseBrainNotes: string[];
  cleaningChecklist: string[];
  suppliesNeeded: string[];
  suggestedQuote: string;
  schedulePreferences: string[];
  followUpQuestions: string[];
};

export function generateLeadReplyDraft(lead: Lead) {
  const missing = [
    !lead.knownDetails.location && "zip code",
    !lead.knownDetails.bedrooms && "bedrooms",
    !lead.knownDetails.bathrooms && "bathrooms",
    !lead.knownDetails.squareFootage && "square footage",
    !lead.knownDetails.pets && "pets",
    !lead.knownDetails.frequency && "one-time or recurring cleaning",
    !lead.knownDetails.preferredDays && "preferred days"
  ].filter(Boolean);

  return `Hi ${lead.name}, thanks for reaching out. I can help with a ${lead.serviceType.toLowerCase()} estimate. Could you send ${missing.join(", ")}? Once I have that, Rachel can recommend the next best walkthrough time.`;
}

export function structureVoiceNote(note: string): StructuredVoiceNote {
  return {
    pets: ["New puppy in home"],
    cleaningRequests: ["Skip the office", "Baseboards every other visit"],
    houseBrainUpdates: [`Original voice note: "${note}"`, "Save to House Brain after Rachel reviews"]
  };
}

export function structureWalkthroughVoiceNote(note: string): StructuredWalkthrough {
  return {
    clientProfile: ["Three bedrooms", "Two bathrooms", "Works from home", `Original voice note: "${note}"`],
    houseBrainNotes: [
      "Hardwood downstairs",
      "Tile upstairs",
      "Marble countertops in kitchen",
      "Garage code 1846",
      "Do not vacuum during Zoom meetings"
    ],
    cleaningChecklist: [
      "Use stone-safe product on marble",
      "Pet hair detail on floors and upholstery",
      "Quiet clean during work-from-home hours",
      "Confirm upstairs tile scope"
    ],
    suppliesNeeded: ["Stone-safe counter spray", "Pet hair roller", "Hardwood cleaner", "Glass cleaner"],
    suggestedQuote: "$210 - $265 every other visit",
    schedulePreferences: ["Every other Thursday morning"],
    followUpQuestions: ["What time are Zoom meetings usually finished?", "Should office be skipped or cleaned quietly?"]
  };
}

export function generateReminderTextPreviews(job: Job, client?: Client) {
  return {
    client:
      `Hi ${job.clientName}! Just confirming your cleaning tomorrow at ${job.time}. ` +
      "If anything has changed, just reply to this text.",
    cleaner:
      `Tomorrow: ${job.clientName}, ${job.time}. Bring ${(client?.productsNeeded ?? job.alerts).slice(0, 3).join(", ")}. ` +
      `${client?.pets ?? "Check pet notes"}. ${client?.accessNotes ?? "Check access notes"}.`,
    morning:
      `Good morning! You have ${job.cleaner === "Rachel" ? "your first" : "an assigned"} job today: ${job.clientName}. ` +
      `Supplies: ${(client?.productsNeeded ?? job.alerts).slice(0, 3).join(", ")}.`,
    walkthrough: "Reminder: Walkthrough with Hannah today at 6:00 PM.",
    airbnb: "Guest checks out at 10:00 AM. Rachelle assigned. Missing towels reported by Noah."
  };
}

export function generateHouseBrainReminders(client: Client) {
  return [
    ...client.productsNeeded.slice(0, 2).map((product) => `Use ${product}`),
    client.pets,
    client.accessNotes,
    client.roomNotes[0],
    client.lastVisitNotes
  ];
}

export function generateFacebookDraft(job: Job, client?: Client) {
  return `Draft only: Another fresh clean completed for ${job.clientName}. Today we focused on ${job.type.toLowerCase()} details, protected ${client?.countertopType ?? "special surfaces"}, and left the home reset for the week. Before/after photos can be added before Rachel posts manually.`;
}

export function generateGoogleBusinessDraft(job: Job) {
  return `Draft only: CleanDesk AI completed a ${job.type.toLowerCase()} in the local area today. Reliable residential cleaning, careful house notes, and photo-backed completion records.`;
}

export function generateReviewRequestDraft(job: Job) {
  return `Hi ${job.clientName}, thank you for trusting Rachel and the CleanDesk team today. If everything looked great, would you mind leaving a quick review? It really helps local families find us.`;
}

export function generateJobSummary(job: Job, client?: Client) {
  return [
    "Today's Visit Summary",
    `${job.type} completed for ${job.clientName}`,
    client?.countertopType ? `${client.countertopType} noted for future visits` : "Surface notes reviewed",
    client?.pets ? client.pets : "No pet note saved",
    client?.lastVisitNotes ? client.lastVisitNotes : "No prior visit note saved",
    "Estimated clean time 2 hr 40 min"
  ];
}
