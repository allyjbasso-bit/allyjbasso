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
    id: "client-tom",
    name: "Tom",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring clean from Apple Calendar",
    preferredDays: ["Monday"],
    pets: "[Demo assumption] Golden retriever",
    accessNotes: "[Demo assumption] Garage keypad",
    parkingNotes: "[Demo assumption] Park in driveway unless client notes otherwise.",
    alarmNotes: "[Demo assumption] No alarm details saved yet.",
    floorType: "[Demo assumption] Hardwood main areas, tile bathrooms",
    countertopType: "[Demo assumption] Granite counters",
    productsNeeded: ["[Demo assumption] Hardwood cleaner", "[Demo assumption] Glass cleaner", "[Demo assumption] Pet hair roller"],
    productsToAvoid: ["[Demo assumption] Heavy fragrance"],
    clutterNotes: "[Demo assumption] Entry and kitchen counters collect clutter.",
    specialInstructions: "[Demo assumption] Customer requested refrigerator this visit.",
    roomNotes: ["[Demo assumption] Kitchen: refrigerator add-on", "[Demo assumption] Living room: pet hair detail", "[Demo assumption] Bathrooms: glass cleaner"],
    averageCleaningTime: "2 hr",
    lastVisitNotes: "Calendar-derived: Clean for Tom appears Jun 20, Jul 6, Jul 20, Aug 3, Aug 17.",
    photoPlaceholders: ["Walkthrough photos", "Access photos", "Before", "After", "Product photos"],
    visitHistory: ["Jul 20: Clean for Tom, 6:30 AM - 8:30 AM", "Jul 6: Clean for Tom", "Jun 20: Clean for Tom"],
    voiceNotes: ["[Demo assumption] Ask whether refrigerator clean is recurring or one-time."]
  },
  {
    id: "client-jayme-lisa",
    name: "Jayme & Lisa",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring clean from Apple Calendar",
    preferredDays: ["Monday"],
    pets: "[Demo assumption] No pet note confirmed.",
    accessNotes: "[Demo assumption] Front door code to confirm.",
    parkingNotes: "[Demo assumption] Street parking is okay.",
    alarmNotes: "[Demo assumption] Ask about alarm before first solo clean.",
    floorType: "[Demo assumption] Hardwood downstairs, carpet bedrooms",
    countertopType: "[Demo assumption] Quartz counters",
    productsNeeded: ["[Demo assumption] Hardwood cleaner", "[Demo assumption] Unscented products"],
    productsToAvoid: ["[Demo assumption] Bleach unless requested"],
    clutterNotes: "[Demo assumption] Kitchen island and mudroom may need extra time.",
    specialInstructions: "[Demo assumption] Prefers unscented products.",
    roomNotes: ["[Demo assumption] Mudroom: shoes and bags", "[Demo assumption] Kitchen: wipe appliance fronts"],
    averageCleaningTime: "2 hr",
    lastVisitNotes: "Calendar-derived: Clean for Jayme & Lisa appears Jul 6, Jul 20, Aug 3.",
    photoPlaceholders: ["Walkthrough photos", "Front door", "Kitchen before", "Kitchen after"],
    visitHistory: ["Jul 20: Clean for Jayme & Lisa, 9:00 AM - 11:00 AM", "Jul 6: Clean for Jayme and Lisa"],
    voiceNotes: ["[Demo assumption] Confirm preferred product scents."]
  },
  {
    id: "client-dan",
    name: "Dan",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring Tuesday clean from Apple Calendar",
    preferredDays: ["Tuesday"],
    pets: "[Demo assumption] Dog in home",
    accessNotes: "[Demo assumption] Garage keypad",
    parkingNotes: "[Demo assumption] Park on street if driveway is full.",
    alarmNotes: "[Demo assumption] No alarm notes saved.",
    floorType: "[Demo assumption] Hardwood and tile",
    countertopType: "[Demo assumption] Granite counters",
    productsNeeded: ["[Demo assumption] Granite cleaner", "[Demo assumption] Hardwood cleaner", "[Demo assumption] Pet hair roller"],
    productsToAvoid: ["[Demo assumption] Vinegar on stone"],
    clutterNotes: "[Demo assumption] Office desk should not be moved.",
    specialInstructions: "[Demo assumption] Customer prefers unscented products.",
    roomNotes: ["[Demo assumption] Kitchen: granite counters", "[Demo assumption] Office: dust only", "[Demo assumption] Floors: pet hair detail"],
    averageCleaningTime: "2 hr 30 min",
    lastVisitNotes: "Calendar-derived: Clean for Dan appears repeatedly on Tuesdays.",
    photoPlaceholders: ["Walkthrough photos", "Damage", "Before", "After", "Access photos"],
    visitHistory: ["Jul 21: Clean for Dan, 9:00 AM - 11:00 AM", "Jul 7: Clean for Dan", "Jun 23: Clean for Dan"],
    voiceNotes: ["[Demo assumption] Garage code should be confirmed before arrival."]
  },
  {
    id: "client-dawn",
    name: "Dawn",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring clean from Apple Calendar",
    preferredDays: ["Tuesday", "Wednesday"],
    pets: "[Demo assumption] Cat in home",
    accessNotes: "[Demo assumption] Client works from home.",
    parkingNotes: "[Demo assumption] Driveway parking is available.",
    alarmNotes: "[Demo assumption] None saved.",
    floorType: "[Demo assumption] Tile upstairs, hardwood downstairs",
    countertopType: "[Demo assumption] Laminate counters",
    productsNeeded: ["[Demo assumption] Glass cleaner", "[Demo assumption] Unscented all-purpose"],
    productsToAvoid: ["[Demo assumption] Strong fragrance"],
    clutterNotes: "[Demo assumption] Bedrooms may need extra pickup.",
    specialInstructions: "[Demo assumption] Do not vacuum during Zoom meetings.",
    roomNotes: ["[Demo assumption] Upstairs: quiet cleaning", "[Demo assumption] Kitchen: standard wipe-down"],
    averageCleaningTime: "2 hr",
    lastVisitNotes: "Calendar-derived: Clean for Dawn appears Jul 15, Jul 21, Aug 4, Aug 12.",
    photoPlaceholders: ["Before", "After", "Living areas", "Bedrooms"],
    visitHistory: ["Jul 21: Clean for Dawn, 11:30 AM - 1:30 PM", "Jul 15: Clean for Dawn"],
    voiceNotes: ["[Demo assumption] Ask whether quiet hours change week to week."]
  },
  {
    id: "client-jessica",
    name: "Jessica",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Monthly clean from Apple Calendar",
    preferredDays: ["Wednesday"],
    pets: "[Demo assumption] Golden retriever",
    accessNotes: "[Demo assumption] Garage keypad 1846",
    parkingNotes: "[Demo assumption] Park in driveway.",
    alarmNotes: "[Demo assumption] Alarm off on cleaning days.",
    floorType: "[Demo assumption] Hardwood downstairs, tile upstairs",
    countertopType: "[Demo assumption] Marble countertops in kitchen",
    productsNeeded: ["[Demo assumption] Stone-safe counter spray", "[Demo assumption] Pet hair roller", "[Demo assumption] Hardwood cleaner"],
    productsToAvoid: ["[Demo assumption] Vinegar on marble", "[Demo assumption] Heavy fragrance"],
    clutterNotes: "[Demo assumption] Kitchen counters collect school items.",
    specialInstructions: "[Demo assumption] Prefers unscented products. Avoid vacuuming during work calls.",
    roomNotes: ["[Demo assumption] Kitchen: marble counters", "[Demo assumption] Downstairs: hardwood cleaner", "[Demo assumption] Upstairs: tile mop"],
    averageCleaningTime: "3 hr",
    lastVisitNotes: "Calendar-derived: Jessica has deep clean Apr 22 and recurring clean Jul 15, Aug 12.",
    photoPlaceholders: ["Walkthrough photos", "Marble counters", "Before", "After", "Access photos"],
    visitHistory: ["Jul 15: Clean for Jessica, 9:00 AM - 12:00 PM", "Jun 17: Clean for Jessica", "Apr 22: Deep Clean for Jessica"],
    voiceNotes: ["[Demo assumption] Confirm whether refrigerator add-on is needed this month."]
  },
  {
    id: "client-sam-debbie",
    name: "Sam & Debbie",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring clean from Apple Calendar",
    preferredDays: ["Thursday"],
    pets: "[Demo assumption] No pet note confirmed.",
    accessNotes: "[Demo assumption] Key under mat should be replaced with keypad.",
    parkingNotes: "[Demo assumption] Street parking preferred.",
    alarmNotes: "[Demo assumption] Ask Rachel before arrival.",
    floorType: "[Demo assumption] Carpet bedrooms, tile bathrooms",
    countertopType: "[Demo assumption] Granite counters",
    productsNeeded: ["[Demo assumption] Granite cleaner", "[Demo assumption] Glass cleaner"],
    productsToAvoid: ["[Demo assumption] Bleach on counters"],
    clutterNotes: "[Demo assumption] Guest room every other visit.",
    specialInstructions: "[Demo assumption] Guest room every other visit.",
    roomNotes: ["[Demo assumption] Guest room: every other visit", "[Demo assumption] Bathrooms: glass cleaner"],
    averageCleaningTime: "3 hr",
    lastVisitNotes: "Calendar-derived: Clean for Sam & Debbie appears Jul 9.",
    photoPlaceholders: ["Before", "After", "Guest room", "Bathrooms"],
    visitHistory: ["Jul 9: Clean for Sam & Debbie, 12:00 PM - 3:00 PM"],
    voiceNotes: ["[Demo assumption] Confirm recurring cadence."]
  },
  {
    id: "client-nancy",
    name: "Nancy",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring Thursday clean from Apple Calendar",
    preferredDays: ["Thursday"],
    pets: "[Demo assumption] Cat in home",
    accessNotes: "[Demo assumption] Garage keypad",
    parkingNotes: "[Demo assumption] Park on street.",
    alarmNotes: "[Demo assumption] None saved.",
    floorType: "[Demo assumption] Hardwood main areas",
    countertopType: "[Demo assumption] Quartz counters",
    productsNeeded: ["[Demo assumption] Hardwood cleaner", "[Demo assumption] Unscented products"],
    productsToAvoid: ["[Demo assumption] Strong fragrance"],
    clutterNotes: "[Demo assumption] Dining room table collects mail.",
    specialInstructions: "[Demo assumption] Customer requested refrigerator this visit.",
    roomNotes: ["[Demo assumption] Refrigerator add-on", "[Demo assumption] Dining room table: clear and wipe"],
    averageCleaningTime: "2 hr",
    lastVisitNotes: "Calendar-derived: Clean for Nancy appears Jul 9, Jul 23, Aug 6.",
    photoPlaceholders: ["Before", "After", "Kitchen", "Access photos"],
    visitHistory: ["Jul 23: Clean for Nancy, 1:00 PM - 3:00 PM", "Jul 9: Clean for Nancy"],
    voiceNotes: ["[Demo assumption] Refrigerator add-on needs invoice line item."]
  },
  {
    id: "client-maryam",
    name: "Maryam",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Recurring Friday clean from Apple Calendar",
    preferredDays: ["Friday"],
    pets: "[Demo assumption] Two golden retrievers that shed a lot",
    accessNotes: "[Demo assumption] Garage code 1846",
    parkingNotes: "[Demo assumption] Driveway parking.",
    alarmNotes: "[Demo assumption] Alarm off before 8:00 AM clean.",
    floorType: "[Demo assumption] Hardwood downstairs, tile upstairs",
    countertopType: "[Demo assumption] Marble countertops in kitchen",
    productsNeeded: ["[Demo assumption] Stone-safe counter spray", "[Demo assumption] Pet hair roller", "[Demo assumption] Hardwood cleaner", "[Demo assumption] Vacuum bags"],
    productsToAvoid: ["[Demo assumption] Vinegar on marble", "[Demo assumption] Heavy fragrance"],
    clutterNotes: "[Demo assumption] Kitchen island and entryway need extra attention.",
    specialInstructions: "[Demo assumption] Prefers unscented products. Customer requested refrigerator this visit.",
    roomNotes: ["[Demo assumption] Kitchen: marble counters", "[Demo assumption] Entry: dog hair", "[Demo assumption] Refrigerator requested this visit"],
    averageCleaningTime: "3 hr",
    lastVisitNotes: "Calendar-derived: Maryam has recurring Friday cleans and an earlier deep clean.",
    photoPlaceholders: ["Walkthrough photos", "Damage", "Before", "After", "Access photos", "Product photos"],
    visitHistory: ["Jul 17: Clean for Maryam, 8:00 AM - 11:00 AM", "Jun 26: Clean for Maryam", "Apr 3: Deep clean for Maryam"],
    voiceNotes: ["[Demo assumption] Confirm whether refrigerator cleaning repeats monthly."]
  },
  {
    id: "client-lori",
    name: "Lori",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Address to confirm",
    frequency: "Calendar clean",
    preferredDays: ["Friday"],
    pets: "[Demo assumption] No pet note confirmed.",
    accessNotes: "[Demo assumption] Front door code to confirm.",
    parkingNotes: "[Demo assumption] Park in driveway.",
    alarmNotes: "[Demo assumption] None saved.",
    floorType: "[Demo assumption] Vinyl plank and tile",
    countertopType: "[Demo assumption] Granite counters",
    productsNeeded: ["[Demo assumption] Granite cleaner", "[Demo assumption] Glass cleaner"],
    productsToAvoid: ["[Demo assumption] Abrasive powder on counters"],
    clutterNotes: "[Demo assumption] Bathroom counters need extra detail.",
    specialInstructions: "[Demo assumption] Confirm scope on arrival.",
    roomNotes: ["[Demo assumption] Bathrooms: detailed counters", "[Demo assumption] Kitchen: granite cleaner"],
    averageCleaningTime: "3 hr",
    lastVisitNotes: "Calendar-derived: Clean for Lori appears Jul 10.",
    photoPlaceholders: ["Before", "After", "Bathrooms", "Kitchen"],
    visitHistory: ["Jul 10: Clean for Lori, 1:00 PM - 4:00 PM"],
    voiceNotes: ["[Demo assumption] Ask whether this is recurring."]
  },
  {
    id: "client-megan",
    name: "Megan",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Walkthrough address pending",
    frequency: "House Brain Pending",
    preferredDays: ["Thursday"],
    pets: "[Demo assumption] Ask during walkthrough.",
    accessNotes: "[Demo assumption] Pending walkthrough.",
    parkingNotes: "[Demo assumption] Pending walkthrough.",
    alarmNotes: "[Demo assumption] Pending walkthrough.",
    floorType: "[Demo assumption] Pending walkthrough.",
    countertopType: "[Demo assumption] Pending walkthrough.",
    productsNeeded: ["[Demo assumption] Walkthrough kit", "[Demo assumption] Measuring notes"],
    productsToAvoid: ["[Demo assumption] Pending walkthrough."],
    clutterNotes: "[Demo assumption] Pending walkthrough.",
    specialInstructions: "Calendar-derived: Walk thru for Megan on Jul 2, 9:00 AM - 9:30 AM.",
    roomNotes: ["Pending walkthrough: capture bedrooms, bathrooms, floors, counters, pets, access."],
    averageCleaningTime: "Pending",
    lastVisitNotes: "House Brain pending from calendar walkthrough.",
    photoPlaceholders: ["Exterior/front door", "Kitchen", "Bathrooms", "Bedrooms", "Damage/problem areas"],
    visitHistory: ["Jul 2: Walk thru for Megan, 9:00 AM - 9:30 AM"],
    voiceNotes: ["Use Walkthrough Voice Notes to create House Brain."]
  },
  {
    id: "client-haustin",
    name: "Haustin",
    phone: "[Demo assumption] Phone not in calendar",
    address: "[Demo assumption] Walkthrough address pending",
    frequency: "House Brain Pending",
    preferredDays: ["Tuesday"],
    pets: "[Demo assumption] Ask during walkthrough.",
    accessNotes: "[Demo assumption] Pending walkthrough.",
    parkingNotes: "[Demo assumption] Pending walkthrough.",
    alarmNotes: "[Demo assumption] Pending walkthrough.",
    floorType: "[Demo assumption] Pending walkthrough.",
    countertopType: "[Demo assumption] Pending walkthrough.",
    productsNeeded: ["[Demo assumption] Walkthrough kit"],
    productsToAvoid: ["[Demo assumption] Pending walkthrough."],
    clutterNotes: "[Demo assumption] Pending walkthrough.",
    specialInstructions: "Calendar-derived: Walk through for Haustin on May 5.",
    roomNotes: ["Pending walkthrough: confirm quote and recurring preferences."],
    averageCleaningTime: "Pending",
    lastVisitNotes: "House Brain pending from calendar walkthrough.",
    photoPlaceholders: ["Exterior/front door", "Kitchen", "Bathrooms", "Living areas"],
    visitHistory: ["May 5: Walk through for Haustin, 1:30 PM - 2:30 PM"],
    voiceNotes: ["Use Walkthrough Voice Notes if Haustin books."]
  },
  {
    id: "client-office-brighton",
    name: "Brighton office",
    phone: "[Demo assumption] Office contact not in calendar",
    address: "[Demo assumption] Brighton office address",
    frequency: "Recurring office clean from Apple Calendar",
    preferredDays: ["Saturday"],
    pets: "No pets expected for office clean.",
    accessNotes: "[Demo assumption] Key pickup / office access code.",
    parkingNotes: "[Demo assumption] Office lot parking.",
    alarmNotes: "[Demo assumption] Confirm alarm status before arrival.",
    floorType: "[Demo assumption] Commercial carpet and tile",
    countertopType: "[Demo assumption] Laminate breakroom counters",
    productsNeeded: ["[Demo assumption] Glass cleaner", "[Demo assumption] Trash liners", "[Demo assumption] All-purpose cleaner"],
    productsToAvoid: ["[Demo assumption] Heavy fragrance"],
    clutterNotes: "[Demo assumption] Desks are not moved unless requested.",
    specialInstructions: "[Demo assumption] Empty trash and clean bathrooms first.",
    roomNotes: ["[Demo assumption] Bathrooms", "[Demo assumption] Breakroom", "[Demo assumption] Entry glass"],
    averageCleaningTime: "2 hr",
    lastVisitNotes: "Calendar-derived: Brighton office appears Jul 11, Jul 25, Aug 8.",
    photoPlaceholders: ["Before", "After", "Supply closet", "Entry"],
    visitHistory: ["Jul 11: Brighton office, 9:00 AM - 11:00 AM"],
    voiceNotes: ["[Demo assumption] Confirm supply closet location."]
  }
];

export const jobs: Job[] = [
  {
    id: "job-1",
    clientId: "client-tom",
    clientName: "Tom",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Rachel",
    time: "6:30 AM",
    endTime: "8:30 AM",
    day: "Mon",
    requestedDays: ["Monday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Tom", "[Demo assumption] Customer requested refrigerator this visit", "[Demo assumption] Bring hardwood cleaner"],
    revenue: 150,
    waitingForPost: true
  },
  {
    id: "job-2",
    clientId: "client-jayme-lisa",
    clientName: "Jayme & Lisa",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Becca",
    time: "9:00 AM",
    endTime: "11:00 AM",
    day: "Mon",
    requestedDays: ["Monday"],
    type: "Recurring Clean",
    status: "Needs Confirmation",
    alerts: ["Calendar-derived: Clean for Jayme & Lisa", "[Demo assumption] Prefers unscented products"],
    revenue: 165
  },
  {
    id: "job-3",
    clientId: "client-office-brighton",
    clientName: "Grand Blanc Airbnb",
    address: "[Demo assumption] Grand Blanc Airbnb property address",
    cleaner: "Rachelle",
    time: "11:00 AM",
    endTime: "3:00 PM",
    day: "Mon",
    requestedDays: ["Monday"],
    type: "Airbnb Turnover",
    status: "In Progress",
    alerts: ["Calendar-derived: Grand blanc Airbnb", "Emily reported Airbnb ready", "Noah reported missing towels"],
    revenue: 240,
    needsFollowUp: true
  },
  {
    id: "job-4",
    clientId: "client-dan",
    clientName: "Dan",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Becca",
    time: "9:00 AM",
    endTime: "11:00 AM",
    day: "Tue",
    requestedDays: ["Tuesday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Dan", "[Demo assumption] Dog in home", "[Demo assumption] Granite counters"],
    revenue: 165
  },
  {
    id: "job-5",
    clientId: "client-dawn",
    clientName: "Dawn",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Rachelle",
    time: "11:30 AM",
    endTime: "1:30 PM",
    day: "Tue",
    requestedDays: ["Tuesday", "Wednesday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Dawn", "[Demo assumption] Do not vacuum during Zoom meetings"],
    revenue: 150
  },
  {
    id: "job-6",
    clientId: "client-jessica",
    clientName: "Jessica",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Rachel",
    time: "9:00 AM",
    endTime: "12:00 PM",
    day: "Wed",
    requestedDays: ["Wednesday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Jessica confirmed tomorrow's cleaning", "[Demo assumption] Marble countertops", "[Demo assumption] Garage keypad 1846"],
    revenue: 220,
    waitingForInvoice: true
  },
  {
    id: "job-7",
    clientId: "client-office-brighton",
    clientName: "Linden Airbnb",
    address: "[Demo assumption] Linden Airbnb property address",
    cleaner: "Rachelle",
    time: "12:30 PM",
    endTime: "5:30 PM",
    day: "Wed",
    requestedDays: ["Wednesday"],
    type: "Airbnb Turnover",
    status: "Confirmed",
    alerts: ["Calendar-derived: Linden Airbnb", "Emily reported Airbnb ready"],
    revenue: 275
  },
  {
    id: "job-8",
    clientId: "client-sam-debbie",
    clientName: "Sam & Debbie",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Rachel",
    time: "12:00 PM",
    endTime: "3:00 PM",
    day: "Thu",
    requestedDays: ["Thursday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Sam & Debbie", "[Demo assumption] Guest room every other visit"],
    revenue: 210
  },
  {
    id: "job-9",
    clientId: "client-nancy",
    clientName: "Nancy",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Becca",
    time: "1:00 PM",
    endTime: "3:00 PM",
    day: "Thu",
    requestedDays: ["Thursday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Nancy", "[Demo assumption] Customer requested refrigerator this visit"],
    revenue: 165
  },
  {
    id: "job-10",
    clientId: "client-maryam",
    clientName: "Maryam",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Rachel",
    time: "8:00 AM",
    endTime: "11:00 AM",
    day: "Fri",
    requestedDays: ["Friday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Maryam", "[Demo assumption] Two golden retrievers", "[Demo assumption] Marble countertops"],
    revenue: 230,
    waitingForPost: true
  },
  {
    id: "job-11",
    clientId: "client-lori",
    clientName: "Lori",
    address: "[Demo assumption] Address to confirm",
    cleaner: "Becca",
    time: "1:00 PM",
    endTime: "4:00 PM",
    day: "Fri",
    requestedDays: ["Friday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Clean for Lori", "[Demo assumption] Granite counters"],
    revenue: 190
  },
  {
    id: "job-12",
    clientId: "client-office-brighton",
    clientName: "Brighton office",
    address: "[Demo assumption] Brighton office address",
    cleaner: "Rachelle",
    time: "9:00 AM",
    endTime: "11:00 AM",
    day: "Sat",
    requestedDays: ["Saturday"],
    type: "Recurring Clean",
    status: "Confirmed",
    alerts: ["Calendar-derived: Brighton office", "[Demo assumption] Bring trash liners"],
    revenue: 125
  },
  {
    id: "job-13",
    clientId: "client-megan",
    clientName: "Megan",
    address: "[Demo assumption] Walkthrough address pending",
    cleaner: "Rachel",
    time: "9:00 AM",
    endTime: "9:30 AM",
    day: "Thu",
    requestedDays: ["Thursday"],
    type: "Walkthrough",
    status: "Needs Confirmation",
    alerts: ["Calendar-derived: Walk thru for Megan", "House Brain Pending"],
    revenue: 0,
    needsFollowUp: true
  }
];

export const leads: Lead[] = [
  {
    id: "lead-megan",
    source: "Referral",
    name: "Megan",
    message: "Calendar-derived walkthrough: Walk thru for Megan on Jul 2 at 9:00 AM.",
    serviceType: "Walkthrough",
    urgency: "Tomorrow",
    status: "Scheduled Walkthrough",
    knownDetails: { preferredDays: "Thursday", location: "[Demo assumption] Address pending" }
  },
  {
    id: "lead-haustin",
    source: "Referral",
    name: "Haustin",
    message: "Calendar-derived walkthrough: Walk through for Haustin on May 5.",
    serviceType: "Walkthrough",
    urgency: "Follow-up",
    status: "Replied",
    knownDetails: { preferredDays: "Tuesday", location: "[Demo assumption] Address pending" }
  },
  {
    id: "lead-jessica",
    source: "Website",
    name: "Jessica",
    message: "Jessica confirmed tomorrow's cleaning. Add confirmation to House Brain.",
    serviceType: "Recurring Clean",
    urgency: "Tomorrow",
    status: "Won",
    knownDetails: { frequency: "Monthly", preferredDays: "Wednesday", pets: "[Demo assumption] Golden retriever" }
  },
  {
    id: "lead-maryam",
    source: "Facebook",
    name: "Maryam",
    message: "Maryam requested refrigerator cleaning for this visit.",
    serviceType: "Recurring Clean",
    urgency: "This week",
    status: "Replied",
    knownDetails: { preferredDays: "Friday", pets: "[Demo assumption] Two golden retrievers" }
  }
];

export const turnovers: AirbnbTurnover[] = [
  {
    id: "turnover-gb",
    propertyName: "Grand Blanc Airbnb",
    address: "[Demo assumption] Grand Blanc Airbnb property address",
    checkoutTime: "11:00 AM",
    checkinTime: "3:00 PM",
    assignedCleaner: "Rachelle",
    status: "In Progress",
    requestedBy: "Emily",
    owner: "Noah",
    issue: "Noah reported missing towels",
    completionPhotos: ["Kitchen reset", "Primary bedroom", "Towel shelf"]
  },
  {
    id: "turnover-linden",
    propertyName: "Linden Airbnb",
    address: "[Demo assumption] Linden Airbnb property address",
    checkoutTime: "12:30 PM",
    checkinTime: "5:30 PM",
    assignedCleaner: "Rachelle",
    status: "Assigned",
    requestedBy: "Emily",
    owner: "Noah",
    completionPhotos: ["Living room", "Bathroom", "Coffee station"]
  },
  {
    id: "turnover-linden-sunday",
    propertyName: "Linden Airbnb",
    address: "[Demo assumption] Linden Airbnb property address",
    checkoutTime: "5:30 PM",
    checkinTime: "10:30 PM",
    assignedCleaner: "Unassigned",
    status: "Requested",
    requestedBy: "Emily",
    owner: "Noah",
    completionPhotos: ["Exterior", "Bedroom", "Kitchen"]
  }
];

export const dailyInbox = [
  "Jessica confirmed tomorrow's cleaning",
  "Megan walkthrough tomorrow",
  "Maryam requested refrigerator cleaning",
  "Emily reported Airbnb ready",
  "Granite cleaner inventory low"
];

export const inboxItems: InboxItem[] = [
  {
    id: "inbox-1",
    source: "Client",
    title: "Jessica confirmed tomorrow's cleaning",
    detail: "Calendar-derived monthly clean is confirmed. House Brain has demo assumptions for marble counters, garage keypad, and golden retriever.",
    action: "Open Jessica profile",
    priority: "High"
  },
  {
    id: "inbox-2",
    source: "Walkthrough",
    title: "Megan walkthrough tomorrow",
    detail: "Calendar-derived: Walk thru for Megan on Thursday at 9:00 AM. House Brain is pending until Rachel captures walkthrough notes.",
    action: "Start walkthrough notes",
    priority: "High"
  },
  {
    id: "inbox-3",
    source: "Facebook",
    title: "Maryam requested refrigerator cleaning",
    detail: "Add refrigerator to Friday's Maryam checklist and confirm whether this is one-time or recurring.",
    action: "Update job checklist",
    priority: "High"
  },
  {
    id: "inbox-4",
    source: "Airbnb",
    title: "Emily reported Airbnb ready",
    detail: "Grand Blanc Airbnb is ready for Rachelle. Noah also reported missing towels.",
    action: "Open Airbnb turnover",
    priority: "High"
  },
  {
    id: "inbox-5",
    source: "Cleaner",
    title: "Becca asked about Dan's granite cleaner",
    detail: "Dan's profile uses a demo assumption for granite counters. Granite cleaner is low, so confirm product before Becca arrives.",
    action: "Check supply inventory",
    priority: "Medium"
  },
  {
    id: "inbox-6",
    source: "Invoice",
    title: "Jessica invoice is waiting",
    detail: "Jessica's Wednesday clean is confirmed and marked as needing invoice generation.",
    action: "Generate invoice",
    priority: "Medium"
  },
  {
    id: "inbox-7",
    source: "Review",
    title: "Maryam review request draft",
    detail: "After Friday's refrigerator add-on, prepare a friendly review request for Rachel to approve.",
    action: "Review draft text",
    priority: "Low"
  },
  {
    id: "inbox-8",
    source: "Schedule",
    title: "Jayme & Lisa need confirmation",
    detail: "Calendar-derived Monday clean is in the route, but status is still Needs Confirmation.",
    action: "Send confirmation draft",
    priority: "High"
  },
  {
    id: "inbox-9",
    source: "Cleaner",
    title: "Granite cleaner inventory low",
    detail: "Today's and this week's jobs include Dan, Sam & Debbie, Lori, and Jessica with demo stone counter notes.",
    action: "Restock granite cleaner",
    priority: "High"
  }
];

export const houseTimelines: Record<string, string[]> = {
  "client-tom": [
    "Calendar-derived: Clean for Tom appears Jun 20, Jul 6, Jul 20, Aug 3, Aug 17.",
    "[Demo assumption] Customer requested refrigerator this visit.",
    "[Demo assumption] Golden retriever added to House Brain.",
    "[Demo assumption] Garage keypad noted for access."
  ],
  "client-jayme-lisa": [
    "Calendar-derived: Clean for Jayme & Lisa appears Jul 6, Jul 20, Aug 3.",
    "[Demo assumption] Prefers unscented products.",
    "[Demo assumption] Mudroom and kitchen island may need extra time."
  ],
  "client-dan": [
    "Calendar-derived: Deep clean Mar 31, then recurring Tuesday cleans.",
    "[Demo assumption] Dog in home.",
    "[Demo assumption] Granite counters require stone-safe product.",
    "[Demo assumption] Garage keypad should be confirmed."
  ],
  "client-dawn": [
    "Calendar-derived: Clean for Dawn appears Jul 15, Jul 21, Aug 4, Aug 12.",
    "[Demo assumption] Client works from home.",
    "[Demo assumption] Do not vacuum during Zoom meetings."
  ],
  "client-jessica": [
    "Calendar-derived: Deep Clean for Jessica on Apr 22.",
    "Calendar-derived: Clean for Jessica on Jun 17, Jul 15, Aug 12.",
    "Jessica confirmed tomorrow's cleaning.",
    "[Demo assumption] Marble countertops and golden retriever added to House Brain.",
    "[Demo assumption] Garage keypad 1846 added as access note."
  ],
  "client-sam-debbie": [
    "Calendar-derived: Clean for Sam & Debbie on Jul 9.",
    "[Demo assumption] Guest room every other visit.",
    "[Demo assumption] Granite counters require stone-safe product."
  ],
  "client-nancy": [
    "Calendar-derived: Clean for Nancy appears Jul 9 and Jul 23.",
    "[Demo assumption] Customer requested refrigerator this visit.",
    "[Demo assumption] Cat in home."
  ],
  "client-maryam": [
    "Calendar-derived: Deep clean Apr 3.",
    "Calendar-derived: Clean for Maryam Apr 24, May 15, Jun 5, Jun 26, Jul 17, Jul 31, Aug 7.",
    "Maryam requested refrigerator cleaning.",
    "[Demo assumption] Two golden retrievers and marble counters added to House Brain.",
    "[Demo assumption] Garage code 1846 should be confirmed before arrival."
  ],
  "client-lori": [
    "Calendar-derived: Clean for Lori on Jul 10.",
    "[Demo assumption] Granite counters added to supplies checklist.",
    "[Demo assumption] Ask whether Lori wants monthly appliance detail."
  ],
  "client-megan": [
    "Calendar-derived: Walk thru for Megan on Jul 2 at 9:00 AM.",
    "House Brain status: Pending.",
    "Use Walkthrough Voice Notes to capture floor type, pets, products, quote, and preferred days."
  ],
  "client-haustin": [
    "Calendar-derived: Walk through for Haustin on May 5.",
    "House Brain status: Pending follow-up.",
    "[Demo assumption] Follow up to confirm whether Haustin booked."
  ],
  "client-office-brighton": [
    "Calendar-derived: Brighton office appears Jul 11, Jul 25, Aug 8.",
    "Calendar-derived: Grand Blanc Airbnb and Linden Airbnb added as operating workflows.",
    "Emily reported Airbnb ready.",
    "Noah reported missing towels."
  ]
};

export const photoFolders = ["Walkthrough photos", "Damage", "Before", "After", "Access photos", "Product photos"];

export const recurringRequests: Record<string, { cadence: string; task: string }[]> = {
  "client-tom": [
    { cadence: "This visit", task: "[Demo assumption] Refrigerator cleaning" },
    { cadence: "Every visit", task: "[Demo assumption] Pet hair roller in living areas" },
    { cadence: "Monthly", task: "[Demo assumption] Glass shower detail" }
  ],
  "client-dan": [
    { cadence: "Every visit", task: "[Demo assumption] Use granite cleaner on counters" },
    { cadence: "Every visit", task: "[Demo assumption] Check pet hair around baseboards" },
    { cadence: "Monthly", task: "[Demo assumption] Office dusting only" }
  ],
  "client-jessica": [
    { cadence: "Every visit", task: "[Demo assumption] Use stone-safe product on marble" },
    { cadence: "Every visit", task: "[Demo assumption] Unscented products only" },
    { cadence: "Every other visit", task: "[Demo assumption] Baseboards downstairs" }
  ],
  "client-maryam": [
    { cadence: "This visit", task: "Customer requested refrigerator cleaning" },
    { cadence: "Every visit", task: "[Demo assumption] Pet hair detail for two golden retrievers" },
    { cadence: "Every other visit", task: "[Demo assumption] Guest room detail" },
    { cadence: "Monthly", task: "[Demo assumption] Marble counter polish" }
  ],
  "client-nancy": [
    { cadence: "This visit", task: "[Demo assumption] Refrigerator cleaning" },
    { cadence: "Every visit", task: "[Demo assumption] Cat hair check in living room" }
  ],
  "client-office-brighton": [
    { cadence: "Every office clean", task: "[Demo assumption] Empty trash first" },
    { cadence: "Every Airbnb turnover", task: "Photo set for Noah and Emily" },
    { cadence: "Every Airbnb turnover", task: "[Demo assumption] Check towels and restock supplies" }
  ]
};

export const houseHealthScores: Record<string, { score: "Easy" | "Moderate" | "Heavy"; trend: string; recommendation: string }> = {
  "client-tom": { score: "Moderate", trend: "[Demo assumption] Pet hair and refrigerator add-on may increase time.", recommendation: "Keep 2 hr block and confirm appliance add-on before arrival." },
  "client-jayme-lisa": { score: "Easy", trend: "[Demo assumption] Stable Monday route stop.", recommendation: "Confirm unscented product preference." },
  "client-dan": { score: "Moderate", trend: "[Demo assumption] Granite counters and dog hair require the right supplies.", recommendation: "Restock granite cleaner before Tuesday jobs." },
  "client-dawn": { score: "Moderate", trend: "[Demo assumption] Work-from-home quiet hours can slow cleaning.", recommendation: "Put quiet tasks first if Dawn is on calls." },
  "client-jessica": { score: "Easy", trend: "Calendar shows a monthly cadence after first deep clean.", recommendation: "Bring stone-safe product and confirm garage keypad." },
  "client-sam-debbie": { score: "Moderate", trend: "[Demo assumption] Guest room every other visit affects time.", recommendation: "Ask Rachel whether this is a guest-room week." },
  "client-nancy": { score: "Moderate", trend: "[Demo assumption] Refrigerator add-on will extend clean.", recommendation: "Add 30 minutes or schedule add-on separately." },
  "client-maryam": { score: "Heavy", trend: "[Demo assumption] Two dogs plus refrigerator request make this a heavier Friday stop.", recommendation: "Bring pet roller, marble-safe product, and appliance cleaner." },
  "client-lori": { score: "Easy", trend: "[Demo assumption] Standard Friday clean with granite counters.", recommendation: "Bring granite cleaner." },
  "client-megan": { score: "Moderate", trend: "House Brain pending until walkthrough notes are captured.", recommendation: "Use Walkthrough Voice Notes and ask all quote questions." },
  "client-haustin": { score: "Moderate", trend: "Walkthrough follow-up is unresolved.", recommendation: "Rachel should mark won/lost or schedule first clean." },
  "client-office-brighton": { score: "Moderate", trend: "Office and Airbnb work have different checklists.", recommendation: "Keep Airbnb turnovers in their own workflow for Emily and Noah." }
};

export const supplyInventory: SupplyItem[] = [
  { name: "Granite Cleaner", quantity: 1, unit: "bottle", neededToday: true, reorderAt: 2 },
  { name: "Hardwood Cleaner", quantity: 2, unit: "bottles", neededToday: true, reorderAt: 2 },
  { name: "Glass Cleaner", quantity: 4, unit: "bottles", neededToday: true, reorderAt: 2 },
  { name: "Pet Hair Roller", quantity: 3, unit: "rollers", neededToday: true, reorderAt: 2 },
  { name: "Stone-Safe Counter Spray", quantity: 1, unit: "bottle", neededToday: true, reorderAt: 2 },
  { name: "Vacuum Bags", quantity: 5, unit: "bags", neededToday: true, reorderAt: 3 },
  { name: "Trash Liners", quantity: 12, unit: "liners", neededToday: false, reorderAt: 10 }
];

export const cleanerMessages = [
  {
    jobId: "job-1",
    from: "Rachel",
    message: "Tom has a refrigerator add-on today. Please take before and after photos.",
    time: "7:58 AM"
  },
  {
    jobId: "job-4",
    from: "Becca",
    message: "I'm missing the granite cleaner for Dan. Can I use the stone-safe spray?",
    time: "8:42 AM"
  },
  {
    jobId: "job-6",
    from: "Rachel",
    message: "Jessica confirmed tomorrow. Bring stone-safe spray and confirm the garage keypad.",
    time: "4:12 PM"
  },
  {
    jobId: "job-10",
    from: "Rachel",
    message: "Maryam requested refrigerator cleaning. Add it to Cleaning Mode checklist.",
    time: "5:03 PM"
  },
  {
    jobId: "job-3",
    from: "Rachelle",
    message: "Grand Blanc Airbnb is ready, but Noah reported missing towels.",
    time: "11:18 AM"
  }
];

export const followUpReminders = [
  "Megan walkthrough tomorrow: use Walkthrough Voice Notes and mark House Brain Pending until saved",
  "Jessica confirmed tomorrow's cleaning: send reminder text draft to cleaner",
  "Maryam refrigerator add-on: ask if this should recur monthly",
  "Granite cleaner inventory low: reorder before Dan, Sam & Debbie, Lori, and Jessica jobs",
  "Haustin walkthrough follow-up: mark won, lost, or schedule first clean"
];

export const contentDrafts = [
  {
    id: "draft-1",
    title: "Maryam refrigerator clean",
    status: "Needs Facebook post",
    photos: ["Refrigerator before", "Refrigerator after", "Kitchen reset"]
  },
  {
    id: "draft-2",
    title: "Jessica marble-safe clean",
    status: "Needs Google Business post",
    photos: ["Marble counters before", "Marble counters after"]
  },
  {
    id: "draft-3",
    title: "Grand Blanc Airbnb ready",
    status: "Needs Facebook post",
    photos: ["Bedroom reset", "Kitchen reset", "Towel shelf issue"]
  }
];

export const todayRevenue = jobs.filter((job) => job.day === "Mon").reduce((sum, job) => sum + job.revenue, 0);

export const weekRevenue = jobs.reduce((sum, job) => sum + job.revenue, 0);
