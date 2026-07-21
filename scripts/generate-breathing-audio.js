#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const envContent = fs.readFileSync(path.join(__dirname, "../.env"), "utf-8");
const API_KEY = envContent.match(/ELEVENLABS_API_KEY=(.+)/)?.[1]?.trim();

if (!API_KEY) {
  console.error("No se encontró ELEVENLABS_API_KEY en .env");
  process.exit(1);
}

const VOICE_ID = "D9MdulIxfrCUUJcGNQon"; // Jhenny 3 — Meditation & Affirmations
const MODEL_ID = "eleven_multilingual_v2";
const OUTPUT_DIR = path.join(__dirname, "../assets/audio/breathing");

// Pausas largas con "..." para que la voz respire entre palabras
const phrases = [
  { file: "inhale", text: "Inhala... lentamente." },
  { file: "hold",   text: "Sostén." },
  { file: "exhale", text: "Exhala... suavemente." },
  { file: "pause",  text: "Pausa." },
  // Frases TCC — suenan durante la exhalación, una por ciclo en rotación
  { file: "tcc_1",  text: "Estás a salvo." },
  { file: "tcc_2",  text: "La adrenalina va a bajar." },
  { file: "tcc_3",  text: "Esto va a pasar. Siempre pasa." },
  { file: "tcc_4",  text: "Tu cuerpo sabe cómo calmarse." },
  { file: "tcc_5",  text: "Nadie muere de un ataque de pánico." },
];

async function generateAudio(phrase) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: phrase.text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.85,        // voz muy consistente y predecible
        similarity_boost: 0.75,
        style: 0.1,             // mínima expresividad, tono neutro y calmo
        use_speaker_boost: false,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Error en "${phrase.file}": ${response.status} — ${err}`);
  }

  const buffer = await response.arrayBuffer();
  const filePath = path.join(OUTPUT_DIR, `${phrase.file}.mp3`);
  fs.writeFileSync(filePath, Buffer.from(buffer));
  console.log(`✓  ${phrase.file}.mp3  ("${phrase.text}")`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Generando ${phrases.length} archivos con voz ${VOICE_ID}...\n`);

  for (const phrase of phrases) {
    await generateAudio(phrase);
    await new Promise((r) => setTimeout(r, 400)); // evita rate-limit
  }

  console.log("\n✅  Audio listo en assets/audio/breathing/");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
