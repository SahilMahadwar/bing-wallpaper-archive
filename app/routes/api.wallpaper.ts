import { json, LoaderFunctionArgs } from "@vercel/remix";
import fetch from "node-fetch";
import { ubuntuThemes } from "~/data/ubuntu-themes";
import { WallpaperData } from "~/types";
import { getColorTheme } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const wallpaperRes = await fetch(
      "https://bing.biturl.top/?resolution=3840&format=json&index=0&mkt=zh-CN"
    );

    if (!wallpaperRes.ok) {
      throw new Error(`Failed to fetch wallpaper: ${wallpaperRes.status}`);
    }

    const wallpaperData = (await wallpaperRes.json()) as WallpaperData;

    const theme = await getColorTheme({
      imagePath: wallpaperData.url,
      theme: ubuntuThemes,
    });

    return json(
      {
        success: true,
        data: {
          ...wallpaperData,
          theme: theme.name,
        },
      },
      200
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handle errors
    console.error("Error fetching data:", error);
    return json({ success: false, error }, 500);
  }
};
