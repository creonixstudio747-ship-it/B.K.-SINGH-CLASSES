"use server";

import Papa from "papaparse";

const SHEET_IDS: Record<string, Record<string, string>> = {
  "11th": {
    "PCM": "1RnNbbQHF2BZRX2FkmiTWg5lHxn2-crFoaHZSnEhbAFc",
    "PCB": "1agpTYjwGBVddz6x806pVqcBxdRILo4X4tft8Eb7sQkE",
    "ARTS": "1tp8qE-qt3B983SST_jhfKlfyMSwUrrPzwajZrmYx_EM",
    "COMMERCE": "1gXPFn7KW3qp64aXmUsmHb1bALoZdt_vq48UqxVbxRbE",
  },
  "12th": {
    "PCM": "1eTEUMldpnV3ZciSHFlAK0xf843lLHhNayEVrHWiuFyk",
    "PCB": "1Il7FmVjDZas3brEWR47ouSS_U3yp3HswIPZbd4TvFKg",
    "ARTS": "157GrByANRk3qNOnSW8SNM-jV4bUQA9mGEgbfMm-dkqY",
    "COMMERCE": "1z2lAPXmEe8nGH68wCUxCP7SjUXgWVIkThg6nVEFfo0I",
  }
};

export interface ChapterResource {
  subject: string;
  chapterName: string;
  notes: string;
  pyqs: string;
  lectures: string;
  extraTips: string;
}

export async function fetchLearningHubData(className: string, streamName: string): Promise<ChapterResource[]> {
  const sheetId = SHEET_IDS[className]?.[streamName];
  if (!sheetId) return [];

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) throw new Error("Failed to fetch CSV");
    
    const csvText = await res.text();
    
    const parsed = Papa.parse<any>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    return parsed.data.map(row => ({
      subject: row["SUBJECT"]?.trim() || "",
      chapterName: row["CHAPTER NAME"]?.trim() || "",
      notes: row["NOTES"]?.trim() || "",
      pyqs: row["PYQs"]?.trim() || "",
      lectures: row["LECTURES"]?.trim() || "",
      extraTips: row["SOME EXTRA TIPS"]?.trim() || ""
    })).filter(item => item.subject && item.chapterName);
  } catch (err) {
    console.error(`Error fetching data for ${className}-${streamName}:`, err);
    return [];
  }
}
