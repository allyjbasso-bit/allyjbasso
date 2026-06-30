export type Role = "rachel" | "becca" | "rachelle" | "emily" | "noah";

export type AssignedPerson = "Rachel" | "Becca" | "Rachelle";

export type JobType = "Recurring Clean" | "Deep Clean" | "Walkthrough" | "Airbnb Turnover" | "Move-Out Clean";

export type JobStatus = "Confirmed" | "Needs Confirmation" | "In Progress" | "Completed" | "Draft";

export type Job = {
  id: string;
  clientId: string;
  clientName: string;
  address: string;
  cleaner: AssignedPerson;
  time: string;
  endTime: string;
  day: string;
  requestedDays: string[];
  type: JobType;
  status: JobStatus;
  alerts: string[];
  revenue: number;
  waitingForInvoice?: boolean;
  waitingForPost?: boolean;
  needsFollowUp?: boolean;
};

export type Client = {
  id: string;
  name: string;
  phone: string;
  address: string;
  frequency: string;
  preferredDays: string[];
  pets: string;
  accessNotes: string;
  parkingNotes: string;
  alarmNotes: string;
  floorType: string;
  countertopType: string;
  productsNeeded: string[];
  productsToAvoid: string[];
  clutterNotes: string;
  specialInstructions: string;
  roomNotes: string[];
  averageCleaningTime: string;
  lastVisitNotes: string;
  photoPlaceholders: string[];
  visitHistory: string[];
  voiceNotes: string[];
};

export type Lead = {
  id: string;
  source: "Angi" | "Facebook" | "Website" | "Referral";
  name: string;
  message: string;
  serviceType: JobType;
  urgency: string;
  status: "New" | "Replied" | "Scheduled Walkthrough" | "Won" | "Lost";
  knownDetails: {
    bedrooms?: string;
    bathrooms?: string;
    location?: string;
    pets?: string;
    squareFootage?: string;
    frequency?: string;
    preferredDays?: string;
  };
};

export type AirbnbTurnover = {
  id: string;
  propertyName: string;
  address: string;
  checkoutTime: string;
  checkinTime: string;
  assignedCleaner: AssignedPerson | "Unassigned";
  status: "Requested" | "Assigned" | "In Progress" | "Completed" | "Issue Reported";
  requestedBy: "Emily";
  owner: "Noah";
  issue?: string;
  completionPhotos: string[];
};

export type InboxItem = {
  id: string;
  source: "Angi" | "Facebook" | "Walkthrough" | "Schedule" | "Review" | "Invoice" | "Client" | "Cleaner" | "Airbnb";
  title: string;
  detail: string;
  action: string;
  priority: "High" | "Medium" | "Low";
};

export type SupplyItem = {
  name: string;
  quantity: number;
  unit: string;
  neededToday: boolean;
  reorderAt: number;
};

export const roles: Record<Role, { label: string; description: string }> = {
  rachel: { label: "Rachel Owner", description: "Owner dashboard, team status, leads, revenue, and follow-up." },
  becca: { label: "Becca Cleaner", description: "Assigned jobs, house instructions, supplies, and Cleaning Mode." },
  rachelle: { label: "Rachelle Cleaner", description: "Assigned jobs, house instructions, supplies, and Cleaning Mode." },
  emily: { label: "Emily Airbnb Manager", description: "Request turnovers and track Airbnb cleaning status for Noah." },
  noah: { label: "Noah Airbnb Owner", description: "Read-only property, turnover, photo, and issue status." }
};

export const assignedPeople: AssignedPerson[] = ["Rachel", "Becca", "Rachelle"];

export const clients: Client[] = [
  {
    id: "client-1",
    name: "Maya Thompson",
    phone: "(555) 214-0198",
    address: "1846 Willow Bend Dr",
    frequency: "Every other Monday",
    preferredDays: ["Monday", "Thursday"],
    pets: "One senior golden retriever; friendly but sheds heavily.",
    accessNotes: "Keypad side door, code 1846. Text when leaving.",
    parkingNotes: "Park along the right side of the driveway; leave garage access clear.",
    alarmNotes: "No alarm. Dog may bark for the first minute.",
    floorType: "Hardwood downstairs, tile baths, carpet bedrooms",
    countertopType: "Quartz kitchen, laminate laundry room",
    productsNeeded: ["Hardwood cleaner", "Unscented all-purpose", "Pet hair roller"],
    productsToAvoid: ["Lemon scent", "Bleach in primary bath"],
    clutterNotes: "Kitchen island gathers mail and school bags.",
    specialInstructions: "Avoid lemon scent. Dust ceiling fan in primary bedroom monthly.",
    roomNotes: ["Kitchen: wipe appliance fronts", "Primary bath: glass shower spots", "Mudroom: pet hair collects under bench"],
    averageCleaningTime: "2 hr 25 min",
    lastVisitNotes: "Extra dog hair in mudroom. Client asked for unscented products again.",
    photoPlaceholders: ["House exterior", "Front door", "Kitchen island", "Primary bath shower", "Mudroom bench"],
    visitHistory: ["Jun 24: recurring clean, $165", "Jun 10: recurring clean, $165", "May 27: recurring clean, $165"],
    voiceNotes: ["Remember fan dusting on the first clean of each month."]
  },
  {
    id: "client-2",
    name: "Nora Patel",
    phone: "(555) 778-4302",
    address: "7204 Larkspur Ct",
    frequency: "Monthly deep clean",
    preferredDays: ["Wednesday", "Friday"],
    pets: "Two indoor cats; keep laundry room door closed.",
    accessNotes: "Garage keypad 7784. Park on street, not driveway.",
    parkingNotes: "Street parking only; HOA fines for driveway service vehicles.",
    alarmNotes: "Alarm off on cleaning days. If keypad beeps, call Nora.",
    floorType: "Tile main areas, carpet guest rooms",
    countertopType: "Marble in kitchen and primary bath",
    productsNeeded: ["Stone-safe counter spray", "Glass shower treatment", "Cat-safe deodorizer"],
    productsToAvoid: ["Vinegar", "Abrasive powder on marble"],
    clutterNotes: "Guest room has donation boxes along one wall.",
    specialInstructions: "Never use vinegar on marble. Confirm before moving art pieces.",
    roomNotes: ["Kitchen: marble counters", "Primary bath: glass shower", "Guest room: clean around donation boxes"],
    averageCleaningTime: "3 hr 10 min",
    lastVisitNotes: "Marble counters needed extra care. Cats hid in laundry room.",
    photoPlaceholders: ["Marble kitchen counters", "Glass shower", "Guest room boxes"],
    visitHistory: ["Jun 17: deep clean, $285", "May 15: deep clean, $275"],
    voiceNotes: ["Ask before moving art on the entry table."]
  },
  {
    id: "client-3",
    name: "Hannah Reed",
    phone: "(555) 903-1277",
    address: "913 Bayberry Lane",
    frequency: "Walkthrough pending",
    preferredDays: ["Tuesday", "Friday"],
    pets: "One small dog; may bark at arrival.",
    accessNotes: "Client works from home. Ring doorbell once.",
    parkingNotes: "Park on the curb in front of the mailbox.",
    alarmNotes: "No alarm information yet.",
    floorType: "Vinyl plank throughout, tile bathrooms",
    countertopType: "Granite kitchen",
    productsNeeded: ["Granite polish", "Low-scent bathroom cleaner"],
    productsToAvoid: ["Strong fragrance"],
    clutterNotes: "Kids playroom needs quote before adding to scope.",
    specialInstructions: "Discuss recurring Friday option and photo storage preference.",
    roomNotes: ["Playroom: quote separately", "Kitchen: granite counters", "Bathrooms: low-scent cleaner"],
    averageCleaningTime: "Unknown",
    lastVisitNotes: "Walkthrough scheduled today.",
    photoPlaceholders: ["Playroom", "Kitchen", "Primary bathroom"],
    visitHistory: ["Today: walkthrough scheduled"],
    voiceNotes: ["Ask whether playroom is included."]
  },
  {
    id: "client-4",
    name: "Alicia Gomez",
    phone: "(555) 310-8841",
    address: "62 Ash Circle",
    frequency: "One-time move-out",
    preferredDays: ["Tuesday"],
    pets: "No pets.",
    accessNotes: "Lockbox on front railing. Code sent by realtor.",
    parkingNotes: "Driveway is clear.",
    alarmNotes: "Vacant property; no alarm.",
    floorType: "Laminate and tile",
    countertopType: "Laminate",
    productsNeeded: ["Oven cleaner", "Fridge bins", "Magic erasers"],
    productsToAvoid: ["None noted"],
    clutterNotes: "Mostly empty; garage has remaining boxes.",
    specialInstructions: "Clean inside appliances and cabinets. Send photos before leaving.",
    roomNotes: ["Kitchen: inside appliances", "Garage: photograph boxes", "Bathrooms: cabinet interiors"],
    averageCleaningTime: "4 hr",
    lastVisitNotes: "Move-out clean drafted.",
    photoPlaceholders: ["Oven", "Fridge", "Garage boxes"],
    visitHistory: ["Tue: move-out clean drafted"],
    voiceNotes: ["Realtor wants final photos."]
  },
  {
    id: "client-5",
    name: "Erin Wallace",
    phone: "(555) 441-2800",
    address: "2408 Juniper Ave",
    frequency: "Walkthrough requested",
    preferredDays: ["Thursday"],
    pets: "Large dog on property; client says friendly but excited.",
    accessNotes: "Meet client at front door.",
    parkingNotes: "Park on street because driveway is narrow.",
    alarmNotes: "Ask during walkthrough.",
    floorType: "Carpet upstairs, hardwood downstairs",
    countertopType: "Quartz",
    productsNeeded: ["Hardwood cleaner", "Pet odor spray"],
    productsToAvoid: ["Heavy floral scent"],
    clutterNotes: "Entryway and playroom may be high clutter.",
    specialInstructions: "Confirm dog plan before assigning cleaner.",
    roomNotes: ["Entryway: shoes and bags", "Playroom: quote separately"],
    averageCleaningTime: "Unknown",
    lastVisitNotes: "Lead requested Thursday, but current draft is Tuesday.",
    photoPlaceholders: ["Front door", "Playroom", "Dog area"],
    visitHistory: ["Draft walkthrough: needs confirmation"],
    voiceNotes: ["Ask if dog will be crated."]
  }
];

export const jobs: Job[] = [
  {
    id: "job-1",
    clientId: "client-1",
    clientName: "Maya Thompson",
    address: "1846 Willow Bend Dr",
    cleaner: "Rachel",
    time: "8:30 AM",
    endTime: "11:00 AM",
    day: "Mon",
    requestedDays: ["Monday", "Thursday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Bring hardwood cleaner", "Use unscented products"],
    revenue: 165,
    waitingForPost: true
  },
  {
    id: "job-2",
    clientId: "client-2",
    clientName: "Nora Patel",
    address: "7204 Larkspur Ct",
    cleaner: "Becca",
    time: "10:00 AM",
    endTime: "1:00 PM",
    day: "Mon",
    requestedDays: ["Wednesday", "Friday"],
    type: "Deep Clean",
    status: "Completed",
    alerts: ["Marble countertops", "Two indoor cats"],
    revenue: 285,
    waitingForInvoice: true
  },
  {
    id: "job-3",
    clientId: "client-3",
    clientName: "Hannah Reed",
    address: "913 Bayberry Lane",
    cleaner: "Rachelle",
    time: "12:30 PM",
    endTime: "1:15 PM",
    day: "Mon",
    requestedDays: ["Tuesday", "Friday"],
    type: "Walkthrough",
    status: "Confirmed",
    alerts: ["Take room photos", "Ask about recurring Fridays"],
    revenue: 0,
    needsFollowUp: true
  },
  {
    id: "job-4",
    clientId: "client-4",
    clientName: "Alicia Gomez",
    address: "62 Ash Circle",
    cleaner: "Becca",
    time: "2:00 PM",
    endTime: "4:30 PM",
    day: "Tue",
    requestedDays: ["Tuesday"],
    type: "Move-Out Clean",
    status: "Draft",
    alerts: ["Empty fridge", "Bring oven cleaner"],
    revenue: 360
  },
  {
    id: "job-5",
    clientId: "client-5",
    clientName: "Erin Wallace",
    address: "2408 Juniper Ave",
    cleaner: "Becca",
    time: "2:00 PM",
    endTime: "3:00 PM",
    day: "Tue",
    requestedDays: ["Thursday"],
    type: "Walkthrough",
    status: "Needs Confirmation",
    alerts: ["Client requested Thursday", "Dog on property"],
    revenue: 0
  },
  {
    id: "job-6",
    clientId: "client-1",
    clientName: "Maya Thompson",
    address: "1846 Willow Bend Dr",
    cleaner: "Rachel",
    time: "9:00 AM",
    endTime: "11:30 AM",
    day: "Thu",
    requestedDays: ["Monday", "Thursday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Hardwood cleaner"],
    revenue: 165
  }
];

export const leads: Lead[] = [
  {
    id: "lead-1",
    source: "Angi",
    name: "Kelly Morgan",
    message: "Looking for a deep clean before family visits this weekend. Three bedrooms and two baths.",
    serviceType: "Deep Clean",
    urgency: "This week",
    status: "New",
    knownDetails: { bedrooms: "3", bathrooms: "2", location: "West Chester", pets: "Unknown" }
  },
  {
    id: "lead-2",
    source: "Facebook",
    name: "Dana Brooks",
    message: "Do you have Friday openings for every other week cleaning? We have a dog and hardwood floors.",
    serviceType: "Recurring Clean",
    urgency: "Next 2 weeks",
    status: "New",
    knownDetails: { pets: "Dog", frequency: "Every other week", preferredDays: "Friday" }
  },
  {
    id: "lead-3",
    source: "Website",
    name: "Marcus Lee",
    message: "Need a move-out clean for a townhouse. Can someone come by for an estimate?",
    serviceType: "Move-Out Clean",
    urgency: "ASAP",
    status: "Scheduled Walkthrough",
    knownDetails: { location: "Townhouse near Oak Ridge" }
  },
  {
    id: "lead-4",
    source: "Referral",
    name: "Priya Shah",
    message: "Nora referred me. Interested in monthly cleaning for a two-story home.",
    serviceType: "Recurring Clean",
    urgency: "Flexible",
    status: "Replied",
    knownDetails: { frequency: "Monthly", location: "Two-story home" }
  }
];

export const turnovers: AirbnbTurnover[] = [
  {
    id: "turnover-1",
    propertyName: "Lake House",
    address: "18 Cove Point Rd",
    checkoutTime: "10:00 AM",
    checkinTime: "4:00 PM",
    assignedCleaner: "Rachelle",
    status: "Assigned",
    requestedBy: "Emily",
    owner: "Noah",
    issue: "Noah reported missing towels",
    completionPhotos: ["Kitchen reset", "Primary bedroom", "Towel shelf"]
  },
  {
    id: "turnover-2",
    propertyName: "Downtown Loft",
    address: "44 Market St Unit 3B",
    checkoutTime: "11:00 AM",
    checkinTime: "3:00 PM",
    assignedCleaner: "Becca",
    status: "In Progress",
    requestedBy: "Emily",
    owner: "Noah",
    completionPhotos: ["Living room", "Bathroom", "Coffee station"]
  },
  {
    id: "turnover-3",
    propertyName: "Garden Cottage",
    address: "9 Iris Lane",
    checkoutTime: "10:00 AM",
    checkinTime: "5:00 PM",
    assignedCleaner: "Unassigned",
    status: "Requested",
    requestedBy: "Emily",
    owner: "Noah",
    completionPhotos: ["Exterior", "Bedroom", "Kitchen"]
  }
];

export const dailyInbox = [
  "Kelly replied to Angi lead",
  "Becca completed Nora Patel clean",
  "Emily requested turnover at Lake House",
  "Noah reported missing towels",
  "Dana needs confirmation text",
  "Maya job needs Facebook post"
];

export const inboxItems: InboxItem[] = [
  {
    id: "inbox-1",
    source: "Angi",
    title: "Kelly Morgan is waiting for a reply",
    detail: "Deep clean lead. Missing square footage, pets, and preferred days.",
    action: "Review draft reply",
    priority: "High"
  },
  {
    id: "inbox-2",
    source: "Facebook",
    title: "Dana asked about Friday openings",
    detail: "Recurring clean lead with dog and hardwood floors.",
    action: "Send draft reply",
    priority: "High"
  },
  {
    id: "inbox-3",
    source: "Walkthrough",
    title: "Hannah walkthrough needs scheduling",
    detail: "Ask about recurring Fridays and photo storage preference.",
    action: "Open walkthrough",
    priority: "Medium"
  },
  {
    id: "inbox-4",
    source: "Schedule",
    title: "Erin Wallace is on the wrong preferred day",
    detail: "Client requested Thursday, but walkthrough is drafted Tuesday.",
    action: "Fix schedule",
    priority: "High"
  },
  {
    id: "inbox-5",
    source: "Review",
    title: "Nora Patel is ready for review request",
    detail: "Deep clean completed. Draft review text is ready.",
    action: "Review text",
    priority: "Low"
  },
  {
    id: "inbox-6",
    source: "Invoice",
    title: "Nora Patel invoice is waiting",
    detail: "Completed deep clean for $285.",
    action: "Generate invoice",
    priority: "Medium"
  },
  {
    id: "inbox-7",
    source: "Client",
    title: "Maya job needs Facebook post",
    detail: "Before/after placeholders are ready for a caption draft.",
    action: "Review post draft",
    priority: "Low"
  },
  {
    id: "inbox-8",
    source: "Cleaner",
    title: "Rachelle needs hardwood cleaner",
    detail: "Supply note attached to today's route.",
    action: "Check inventory",
    priority: "High"
  },
  {
    id: "inbox-9",
    source: "Airbnb",
    title: "Noah reported missing towels",
    detail: "Lake House turnover has an open issue.",
    action: "Open turnover",
    priority: "High"
  }
];

export const houseTimelines: Record<string, string[]> = {
  "client-1": [
    "Walkthrough completed",
    "First clean finished in 2 hr 40 min",
    "Added dog hair detail to mudroom",
    "Customer requested unscented products",
    "Garage / side door code confirmed",
    "Baseboards moved to monthly rotation",
    "Customer left $20 tip"
  ],
  "client-2": [
    "Walkthrough noted marble counters",
    "First deep clean completed",
    "Cats added to access reminders",
    "Customer requested no vinegar",
    "Guest room donation boxes noted",
    "Marble-safe product required every visit",
    "Customer left $40 tip"
  ],
  "client-3": [
    "Walkthrough scheduled",
    "Playroom needs separate quote",
    "Dog plan needs confirmation"
  ],
  "client-4": ["Move-out clean drafted", "Realtor requested final photos"],
  "client-5": ["Lead requested Thursday", "Dog on property", "Walkthrough needs confirmation"]
};

export const photoFolders = ["Walkthrough photos", "Damage", "Before", "After", "Access photos", "Product photos"];

export const recurringRequests: Record<string, { cadence: string; task: string }[]> = {
  "client-1": [
    { cadence: "Every visit", task: "Pet hair roller in mudroom" },
    { cadence: "Every other visit", task: "Baseboards downstairs" },
    { cadence: "Monthly", task: "Dust primary bedroom ceiling fan" },
    { cadence: "Quarterly", task: "Interior windows" }
  ],
  "client-2": [
    { cadence: "Every visit", task: "Use stone-safe cleaner on marble" },
    { cadence: "Every other visit", task: "Glass shower treatment" },
    { cadence: "Monthly", task: "Guest room detail around boxes" },
    { cadence: "Quarterly", task: "Cabinet fronts" }
  ]
};

export const houseHealthScores: Record<string, { score: "Easy" | "Moderate" | "Heavy"; trend: string; recommendation: string }> = {
  "client-1": { score: "Moderate", trend: "Pet hair has increased over the last two visits.", recommendation: "Recommend mudroom detail every visit." },
  "client-2": { score: "Easy", trend: "Stable monthly deep clean pattern.", recommendation: "Keep marble-safe products stocked." },
  "client-3": { score: "Moderate", trend: "Playroom may add time.", recommendation: "Quote playroom as separate scope." },
  "client-4": { score: "Heavy", trend: "Move-out appliance work adds time.", recommendation: "Block four hours and send final photos." },
  "client-5": { score: "Heavy", trend: "Dog and clutter notes need walkthrough confirmation.", recommendation: "Confirm dog plan before assigning cleaner." }
};

export const supplyInventory: SupplyItem[] = [
  { name: "Granite Cleaner", quantity: 2, unit: "bottles", neededToday: true, reorderAt: 2 },
  { name: "Hardwood Cleaner", quantity: 1, unit: "bottle", neededToday: true, reorderAt: 2 },
  { name: "Glass Cleaner", quantity: 4, unit: "bottles", neededToday: true, reorderAt: 2 },
  { name: "Pet Hair Roller", quantity: 3, unit: "rollers", neededToday: true, reorderAt: 2 },
  { name: "Grout Brush", quantity: 1, unit: "brush", neededToday: true, reorderAt: 2 },
  { name: "Stone-Safe Counter Spray", quantity: 1, unit: "bottle", neededToday: true, reorderAt: 2 }
];

export const cleanerMessages = [
  {
    jobId: "job-1",
    from: "Rachel",
    message: "Customer is home today. Use side door and keep dog inside.",
    time: "8:12 AM"
  },
  {
    jobId: "job-2",
    from: "Becca",
    message: "I'm missing the granite cleaner. Can I use stone-safe spray?",
    time: "10:18 AM"
  },
  {
    jobId: "job-3",
    from: "Rachelle",
    message: "Garage won't open. Waiting at front door.",
    time: "12:34 PM"
  }
];

export const followUpReminders = [
  "Hannah walkthrough: no response after 2 days",
  "Nora clean: ask for review after 3 days",
  "Dana lead: confirmation text needed",
  "Maya: Facebook post draft waiting"
];

export const contentDrafts = [
  {
    id: "draft-1",
    title: "Maya Thompson recurring clean",
    status: "Needs Facebook post",
    photos: ["Kitchen before", "Kitchen after", "Mudroom after"]
  },
  {
    id: "draft-2",
    title: "Nora Patel marble-safe deep clean",
    status: "Needs Google Business post",
    photos: ["Marble counters before", "Marble counters after"]
  }
];

export const todayRevenue = jobs.filter((job) => job.day === "Mon").reduce((sum, job) => sum + job.revenue, 0);

export const weekRevenue = jobs.reduce((sum, job) => sum + job.revenue, 0);
