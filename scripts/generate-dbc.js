#!/usr/bin/env node
/**
 * OpenECU Alliance Protocol to DBC Converter
 *
 * Converts OpenECU Alliance protocol YAML files to Vector DBC format
 * for use with CAN analysis tools like CANalyzer, PCAN-View, SavvyCAN, etc.
 *
 * Usage:
 *   node generate-dbc.js <protocol.yaml> [output.dbc]
 *   node generate-dbc.js --all  # Convert all protocols
 *
 * Requirements:
 *   npm install yaml
 */

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

/**
 * Parse a message ID that can be either a number or hex string
 */
function parseMessageId(id) {
  if (typeof id === "number") return id;
  if (typeof id === "string" && id.startsWith("0x")) {
    return parseInt(id, 16);
  }
  return parseInt(id, 10);
}

/**
 * Convert byte order to DBC format
 * DBC uses: 0 = big endian (Motorola), 1 = little endian (Intel)
 */
function getByteOrder(byteOrder) {
  return byteOrder === "little_endian" ? 1 : 0;
}

/**
 * Convert data type to DBC value type
 * DBC uses: + = unsigned, - = signed
 */
function getValueType(dataType) {
  return dataType === "signed" ? "-" : "+";
}

/**
 * Generate DBC file content from protocol definition
 */
function generateDBC(protocol) {
  const lines = [];

  // Header
  lines.push('VERSION ""');
  lines.push("");
  lines.push("NS_ :");
  lines.push("");
  lines.push("BS_:");
  lines.push("");

  // ECU nodes
  const transmitters = new Set();
  for (const msg of protocol.messages) {
    if (msg.transmitter) {
      transmitters.add(msg.transmitter);
    }
  }
  lines.push(`BU_: ${Array.from(transmitters).join(" ") || "ECU"}`);
  lines.push("");

  // Messages and signals
  for (const msg of protocol.messages) {
    const msgId = parseMessageId(msg.id);
    const transmitter = msg.transmitter || "ECU";

    lines.push(
      `BO_ ${msgId} ${msg.name.replace(/\s+/g, "_")}: ${msg.length} ${transmitter}`,
    );

    for (const signal of msg.signals || []) {
      const startBit = signal.start_bit;
      const length = signal.length;
      const byteOrder = getByteOrder(signal.byte_order);
      const valueType = getValueType(signal.data_type);
      const scale = signal.scale || 1;
      const offset = signal.offset || 0;
      const min = signal.min || 0;
      const max = signal.max || 0;
      const unit = signal.unit || "";

      lines.push(
        ` SG_ ${signal.name.replace(/\s+/g, "_")} : ${startBit}|${length}@${byteOrder}${valueType} (${scale},${offset}) [${min}|${max}] "${unit}" Vector__XXX`,
      );
    }
    lines.push("");
  }

  // Message comments
  lines.push("");
  for (const msg of protocol.messages) {
    const msgId = parseMessageId(msg.id);
    if (msg.description) {
      lines.push(
        `CM_ BO_ ${msgId} "${msg.description.replace(/"/g, '\\"').replace(/\n/g, " ")}";`,
      );
    }
  }

  // Signal comments
  for (const msg of protocol.messages) {
    const msgId = parseMessageId(msg.id);
    for (const signal of msg.signals || []) {
      if (signal.description) {
        lines.push(
          `CM_ SG_ ${msgId} ${signal.name.replace(/\s+/g, "_")} "${signal.description.replace(/"/g, '\\"').replace(/\n/g, " ")}";`,
        );
      }
    }
  }

  // Value descriptions (enums)
  if (protocol.enums) {
    lines.push("");
    for (const enumDef of protocol.enums) {
      // Find signals that reference this enum
      for (const msg of protocol.messages) {
        const msgId = parseMessageId(msg.id);
        for (const signal of msg.signals || []) {
          if (signal.enum_ref === enumDef.name) {
            const valueStrings = Object.entries(enumDef.values)
              .map(([value, label]) => `${value} "${label}"`)
              .join(" ");
            lines.push(
              `VAL_ ${msgId} ${signal.name.replace(/\s+/g, "_")} ${valueStrings};`,
            );
          }
        }
      }
    }
  }

  // Attributes for message intervals
  lines.push("");
  lines.push('BA_DEF_ BO_ "GenMsgCycleTime" INT 0 10000;');
  lines.push('BA_DEF_DEF_ "GenMsgCycleTime" 0;');

  for (const msg of protocol.messages) {
    if (msg.interval_ms) {
      const msgId = parseMessageId(msg.id);
      lines.push(`BA_ "GenMsgCycleTime" BO_ ${msgId} ${msg.interval_ms};`);
    }
  }

  return lines.join("\n");
}

/**
 * Convert a single protocol file
 */
function convertFile(inputPath, outputPath) {
  console.log(`Converting: ${inputPath}`);

  const content = fs.readFileSync(inputPath, "utf-8");
  const protocol = yaml.parse(content);

  if (protocol.type !== "protocol") {
    console.error(`  Skipping: Not a protocol file (type: ${protocol.type})`);
    return false;
  }

  const dbc = generateDBC(protocol);

  if (!outputPath) {
    outputPath = inputPath.replace(/\.protocol\.ya?ml$/, ".dbc");
  }

  fs.writeFileSync(outputPath, dbc);
  console.log(`  Output: ${outputPath}`);
  return true;
}

/**
 * Convert all protocol files in the repository
 */
function convertAll() {
  const protocolsDir = path.join(__dirname, "..", "protocols");

  if (!fs.existsSync(protocolsDir)) {
    console.error("Error: protocols/ directory not found");
    process.exit(1);
  }

  let converted = 0;
  let errors = 0;

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (
        file.endsWith(".protocol.yaml") ||
        file.endsWith(".protocol.yml")
      ) {
        try {
          if (convertFile(filePath)) {
            converted++;
          }
        } catch (err) {
          console.error(`  Error: ${err.message}`);
          errors++;
        }
      }
    }
  }

  walkDir(protocolsDir);
  console.log(`\nConverted: ${converted} files, Errors: ${errors}`);
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("OpenECU Alliance Protocol to DBC Converter");
  console.log("");
  console.log("Usage:");
  console.log("  node generate-dbc.js <protocol.yaml> [output.dbc]");
  console.log("  node generate-dbc.js --all");
  console.log("");
  console.log("Examples:");
  console.log(
    "  node generate-dbc.js protocols/haltech/haltech-elite-broadcast.protocol.yaml",
  );
  console.log("  node generate-dbc.js --all");
  process.exit(0);
}

if (args[0] === "--all") {
  convertAll();
} else {
  try {
    convertFile(args[0], args[1]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
