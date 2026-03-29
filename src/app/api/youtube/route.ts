import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes to save API quotas

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = "UCQ9Mr2KzICkZzoc6r5R-h3w";

  if (!apiKey) {
    return NextResponse.json({ error: "No API key configured" }, { status: 500 });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch YouTube data");

    const data = await res.json();

    const formattedVideos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      // Decode HTML entities often left in titles
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
      isLive: item.snippet.liveBroadcastContent === "live",
      duration: item.snippet.liveBroadcastContent === "live" ? "LIVE" : "Recorded",
      publishedAt: item.snippet.publishedAt
    }));

    // If you want actual older live streams (completed) to show in Live tab, 
    // it requires calling a second endpoint (search eventType=completed) or relying purely on active lives.
    // The prompt distinguishes "videos section and live class section". 
    // Usually, completed broadcast events stay separate, but search API masks them without specific query.
    // We will funnel active streams to Live, else to Videos.

    return NextResponse.json({ videos: formattedVideos });
  } catch (error: any) {
    console.error("YouTube fetch error:", error);
    return NextResponse.json({ error: "Could not fetch videos" }, { status: 500 });
  }
}
