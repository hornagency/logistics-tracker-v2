/// <reference types="node" />
// Load .env.local (Next.js) and .env so Prisma sees DATABASE_URL when seed runs
const path = require("path");
const projectRoot = path.resolve(__dirname, "..");
require("dotenv").config({ path: path.join(projectRoot, ".env.local") });
require("dotenv").config({ path: path.join(projectRoot, ".env") });

if (!process.env.DATABASE_URL) {
  console.error("\n❌ DATABASE_URL is not set.");
  console.error("   Add DATABASE_URL to .env.local (or .env) in the project root and try again.\n");
  process.exit(1);
}

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const shipments = [
    {
      trackingCode:      "VLA-AF7X2K",
      origin:            "New York, USA",
      destination:       "London, UK",
      status:            "Delivered",
      serviceType:       "Air Freight",
      // Sender
      senderName:        "Apex Electronics Inc.",
      senderAddress:     "340 5th Avenue, New York, NY 10001",
      senderEmail:       "exports@apexelectronics.com",
      senderPhone:       "+1 212 555 0192",
      // Receiver
      recipientName:     "James Whitfield",
      recipientAddress:  "14 Canary Wharf, London, E14 5AB",
      recipientEmail:    "j.whitfield@bridgeimports.co.uk",
      recipientPhone:    "+44 20 7946 0021",
      // Package
      packageType:       "Box",
      pieces:            "4 boxes",
      weight:            "18 kg",
      dimensions:        "50 × 40 × 30 cm",
      packageDesc:       "Electronic components — handle with care",
      declaredValue:     "USD 4,200",
      specialHandling:   "Fragile",
      // Delivery
      estimatedDelivery: new Date("2026-03-08"),
      signatureRequired: true,
      notes: "Recipient available Mon–Fri only. Deliver to reception desk.",
      updates: [
        { status: "Order received",         location: "New York Processing Centre",          description: "Shipment booked and collected from sender" },
        { status: "Customs cleared",         location: "JFK Airport, New York",               description: "Export documentation approved" },
        { status: "In Transit",              location: "JFK — London Heathrow (AA107)",       description: "Departed on scheduled flight" },
        { status: "Arrived at destination",  location: "London Heathrow",                    description: "Cleared UK customs — no issues" },
        { status: "Out for Delivery",        location: "Vectora London Hub",              description: "Assigned to delivery driver" },
        { status: "Delivered",               location: "14 Canary Wharf, London",             description: "Signed for by reception. Delivered on time." },
      ],
    },
    {
      trackingCode:      "VLA-OC3B9M",
      origin:            "Shanghai, China",
      destination:       "Rotterdam, Netherlands",
      status:            "In Transit",
      serviceType:       "Ocean Freight",
      // Sender
      senderName:        "SinoTech Manufacturing Co.",
      senderAddress:     "88 Pudong Industrial Zone, Shanghai 200120",
      senderEmail:       "shipping@sinotech.cn",
      senderPhone:       "+86 21 6888 3300",
      // Receiver
      recipientName:     "Martijn van der Berg",
      recipientAddress:  "Waalhaven Zuidzijde 19, 3089 JH Rotterdam",
      recipientEmail:    "mberg@dutchcargo.nl",
      recipientPhone:    "+31 10 412 0053",
      // Package
      packageType:       "Pallet",
      pieces:            "4 pallets",
      weight:            "3,200 kg",
      dimensions:        "120 × 80 × 100 cm per pallet",
      packageDesc:       "Industrial machinery parts",
      declaredValue:     "EUR 28,500",
      specialHandling:   "Keep Upright",
      // Delivery
      estimatedDelivery: new Date("2026-03-28"),
      signatureRequired: true,
      notes: "Forklift required at delivery point. Contact recipient 24 hours before arrival.",
      updates: [
        { status: "Order received",  location: "Shanghai Warehouse",    description: "Container loaded and sealed" },
        { status: "Customs cleared", location: "Port of Shanghai",      description: "Export documentation processed" },
        { status: "In Transit",      location: "South China Sea",       description: "Vessel: MSC Aurora — ETA Rotterdam in 22 days" },
        { status: "In Transit",      location: "Strait of Malacca",     description: "On schedule, no delays reported" },
      ],
    },
    {
      trackingCode:      "VLA-RD5H1P",
      origin:            "Manchester, UK",
      destination:       "Paris, France",
      status:            "Out for Delivery",
      serviceType:       "Road Freight",
      // Sender
      senderName:        "Northern Textile Group",
      senderAddress:     "7 Textile Way, Manchester, M4 1HQ",
      senderEmail:       "dispatch@ntguk.co.uk",
      senderPhone:       "+44 161 832 4400",
      // Receiver
      recipientName:     "Claire Dupont",
      recipientAddress:  "8 Rue de Rivoli, 75001 Paris",
      recipientEmail:    "claire.dupont@maison-dupont.fr",
      recipientPhone:    "+33 1 42 33 17 08",
      // Package
      packageType:       "Box",
      pieces:            "6 boxes",
      weight:            "95 kg",
      dimensions:        "60 × 40 × 40 cm per box",
      packageDesc:       "Textile goods",
      declaredValue:     "EUR 3,800",
      specialHandling:   "Keep Dry",
      // Delivery
      estimatedDelivery: new Date("2026-03-11"),
      signatureRequired: false,
      notes: "Customer requested morning delivery before 11 am.",
      updates: [
        { status: "Order received",  location: "Manchester Depot",              description: "Collected from sender's warehouse" },
        { status: "In Transit",      location: "Channel Tunnel, Folkestone",    description: "Passed UK border control" },
        { status: "In Transit",      location: "Calais Distribution Hub",       description: "Transferred to Paris delivery vehicle" },
        { status: "Out for Delivery",location: "Paris — 1st Arrondissement",    description: "Driver en route, estimated arrival 9:30 am" },
      ],
    },
    {
      trackingCode:      "VLA-WH8N4T",
      origin:            "Dubai, UAE",
      destination:       "Lagos, Nigeria",
      status:            "Processing",
      serviceType:       "Air Freight",
      // Sender
      senderName:        "Gulf Medical Supplies LLC",
      senderAddress:     "Dubai Healthcare City, Block C, Dubai",
      senderEmail:       "exports@gulfmedical.ae",
      senderPhone:       "+971 4 362 8800",
      // Receiver
      recipientName:     "Emeka Okonkwo",
      recipientAddress:  "Plot 14, Apapa Industrial Estate, Lagos",
      recipientEmail:    "emeka@okonkwotrade.com.ng",
      recipientPhone:    "+234 1 270 4412",
      // Package
      packageType:       "Box",
      pieces:            "12 boxes",
      weight:            "42 kg",
      dimensions:        "30 × 25 × 20 cm per box",
      packageDesc:       "Pharmaceutical supplies — temperature sensitive",
      declaredValue:     "USD 9,100",
      specialHandling:   "Keep Refrigerated",
      // Delivery
      estimatedDelivery: new Date("2026-03-15"),
      signatureRequired: true,
      notes: "Cold chain packaging required. Do not expose to temperatures above 8°C.",
      updates: [
        { status: "Order received", location: "Dubai Cargo Terminal",     description: "Shipment booked. Awaiting cold-chain packaging confirmation." },
        { status: "Processing",     location: "Dubai Cold Storage Hub",   description: "Temperature-controlled packaging in progress" },
      ],
    },
    {
      trackingCode:      "VLA-EX2V6R",
      origin:            "Toronto, Canada",
      destination:       "Tokyo, Japan",
      status:            "In Transit",
      serviceType:       "Express",
      // Sender
      senderName:        "Tanaka Holdings Canada Inc.",
      senderAddress:     "1500 Bay Street, Toronto, ON M5H 2Y3",
      senderEmail:       "logistics@tanaka-canada.com",
      senderPhone:       "+1 416 555 0280",
      // Receiver
      recipientName:     "Hiroshi Tanaka",
      recipientAddress:  "2-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005",
      recipientEmail:    "h.tanaka@tanaka-trading.co.jp",
      recipientPhone:    "+81 3 5555 0178",
      // Package
      packageType:       "Envelope",
      pieces:            "1 envelope + 2 sample boxes",
      weight:            "3.5 kg",
      dimensions:        "35 × 25 × 10 cm",
      packageDesc:       "Legal documents and product samples",
      declaredValue:     "USD 800",
      specialHandling:   "High Value",
      // Delivery
      estimatedDelivery: new Date("2026-03-12"),
      signatureRequired: true,
      notes: "Time sensitive — required for board meeting on delivery date.",
      updates: [
        { status: "Order received",  location: "Toronto Pearson Express Hub",   description: "Priority shipment confirmed and collected" },
        { status: "Customs cleared", location: "Toronto Pearson Airport",       description: "Export documentation fast-tracked" },
        { status: "In Transit",      location: "Vancouver Connecting Hub",      description: "Transferred to Pacific route flight" },
        { status: "In Transit",      location: "Over Pacific Ocean",            description: "AC837 en route — ETA Narita Airport in 9 hours" },
      ],
    },
    {
      trackingCode:      "VLA-SC4K7W",
      origin:            "Shenzhen, China",
      destination:       "Amsterdam, Netherlands",
      status:            "Delivered",
      serviceType:       "Ocean Freight",
      // Sender
      senderName:        "Guangdong Bright Tech Co., Ltd.",
      senderAddress:     "22 Longhua Industrial Park, Shenzhen 518109",
      senderEmail:       "export@brighttech.cn",
      senderPhone:       "+86 755 2800 4400",
      // Receiver
      recipientName:     "Sophie de Vries",
      recipientAddress:  "Handelskade 48, 1019 BN Amsterdam",
      recipientEmail:    "s.devries@noorderimports.nl",
      recipientPhone:    "+31 20 673 4490",
      // Package
      packageType:       "Crate",
      pieces:            "2 × 20ft containers",
      weight:            "11,500 kg",
      dimensions:        "20ft ISO containers",
      packageDesc:       "Consumer electronics",
      declaredValue:     "EUR 142,000",
      specialHandling:   "High Value",
      // Delivery
      estimatedDelivery: new Date("2026-02-28"),
      signatureRequired: true,
      notes: null,
      updates: [
        { status: "Order received",         location: "Shenzhen Port",                              description: "Two containers booked and loaded" },
        { status: "In Transit",             location: "South China Sea",                            description: "Vessel: Evergreen Honour — departed Shenzhen" },
        { status: "In Transit",             location: "Suez Canal",                                 description: "Transit proceeding without delay" },
        { status: "Arrived at destination", location: "Port of Rotterdam",                         description: "Containers offloaded and cleared" },
        { status: "In Transit",             location: "Rotterdam – Amsterdam road leg",             description: "Final delivery in progress" },
        { status: "Delivered",              location: "Amsterdam Warehouse, Handelskade 48",        description: "Both containers unloaded and signed off by client." },
      ],
    },
  ];

  for (const s of shipments) {
    const { updates, ...rest } = s;
    const shipmentData = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined)
    );
    const created = await prisma.shipment.upsert({
      where: { trackingCode: shipmentData.trackingCode },
      update: {},
      create: {
        ...shipmentData,
        updates: { create: updates },
      },
    });
    console.log("✓", created.trackingCode, `— ${created.status}`);
  }

  // Ensure default contact settings exist (singleton)
  const existingContact = await prisma.contactSettings.findFirst();
  if (!existingContact) {
    await prisma.contactSettings.create({
      data: {
        email: "contact@vectoralogistics.com",
        phone: "+44 20 7123 4567",
        officeHoursLine1: "Mon – Fri, 8 am – 6 pm (GMT)",
        officeHoursLine2: "Shipment tracking: 24/7 online",
      },
    });
    console.log("✓ Contact settings (default)");
  }

  console.log("\nSeed complete. 6 demo shipments ready.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
